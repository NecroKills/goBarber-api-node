"use strict";

require("reflect-metadata");

var _ResetPasswordService = _interopRequireDefault(require("./ResetPasswordService"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeUsersTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersTokensRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeUserTokensRepository;
let fakeHashProvider;
let resetPassword;
describe('ResetPasswordService', () => {
  // Dispara antes de cada um dos its.
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeUserTokensRepository = new _FakeUsersTokensRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    resetPassword = new _ResetPasswordService.default(fakeUsersRepository, fakeUserTokensRepository, fakeHashProvider);
  });
  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'maycon da silva moreira',
      email: 'maycondasilvamoreira@example.com',
      password: '123456'
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    await resetPassword.execute({
      password: '123123',
      token
    });
    const updateUser = await fakeUsersRepository.findById(user.id);
    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updateUser === null || updateUser === void 0 ? void 0 : updateUser.password).toBe('123123');
  });
  it('should not be able to reset the password with non-exiting token', async () => {
    await expect(resetPassword.execute({
      token: 'non-existing-token',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset the password with non-exiting user', async () => {
    const {
      token
    } = await fakeUserTokensRepository.generate('non-existing-user');
    await expect(resetPassword.execute({
      token,
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset password if passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'maycon da silva moreira',
      email: 'maycondasilvamoreira@example.com',
      password: '123456'
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id); // mockImplementationOnce executa apentas uma vez.
    // quando algum codigo depois do codigo abaixo executar a função Date.now,
    // faz executar a minha função do meu teste dentro de uma função global do javascript

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date(); // Retorno customDate pegando o numero de horas e setando mais 3 horas.

      return customDate.setHours(customDate.getHours() + 3);
    });
    await expect(resetPassword.execute({
      password: '123123',
      token
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});