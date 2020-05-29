import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import UpdateUsersAvatarService from '@modules/users/services/UpdateUserAvatarService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUsersAvatarService;

// describe: significa categoria ou seja Testes da categoria CreateAppointment
// it deixa mais claro o teste que estamos fazendo.
describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUsersAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'maycon da silva moreira',
      email: 'maycon@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    // Fica espiando se o deleteFile foi disparada.
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'maycon da silva moreira',
      email: 'maycon@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    // Espero que essa função seja chamada com parametro especifico 'avatar.jpg'
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    // eu espero que tenha trocado para 'avatar2.jpg'
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
