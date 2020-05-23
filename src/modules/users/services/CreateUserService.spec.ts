import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUsersService from '@modules/users/services/createUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

// describe: significa categoria ou seja Testes da categoria CreateAppointment
// it deixa mais claro o teste que estamos fazendo.
describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUsersService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'maycon da silva moreira',
      email: 'maycon@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUsersService(fakeUsersRepository);

    await createUser.execute({
      name: 'maycon da silva moreira',
      email: 'maycon@example.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'maycon da silva moreira',
        email: 'maycon@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
