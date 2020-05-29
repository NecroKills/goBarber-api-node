import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import AuthenticateUsersService from '@modules/users/services/AuthenticateUserService';

import CreateUsersService from '@modules/users/services/createUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUsersService;
let authenticateUser: AuthenticateUsersService;

// describe: significa categoria ou seja Testes da categoria CreateAppointment
// it deixa mais claro o teste que estamos fazendo.
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUsersService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'maycon da silva moreira',
      email: 'maycon@example.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'maycon@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'maycon@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'maycon da silva moreira',
      email: 'maycon@example.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'maycon@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
