import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUsersService from '@modules/users/services/createUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUsersService;

// describe: significa categoria ou seja Testes da categoria CreateAppointment
// it deixa mais claro o teste que estamos fazendo.
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUsersService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'maycon da silva moreira',
      email: 'maycon@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'maycon da silva moreira',
      email: 'maycon@example.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'maycon da silva moreira',
        email: 'maycon@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
