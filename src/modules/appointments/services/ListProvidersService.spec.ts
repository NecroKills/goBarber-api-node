import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

// describe: significa categoria ou seja Testes da categoria CreateAppointment
// it deixa mais claro o teste que estamos fazendo.
describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'maycon um',
      email: 'maycon@example.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'maycon dois',
      email: 'maycon1@example.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'maycon tres',
      email: 'maycon2@example.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
