import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokensRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
// import AppError from '@shared/errors/AppError';
// import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  token: string;
  password: string;
}
@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('hashProvider')
    private userTokenRepository: IUserTokenRepository,

    @inject('UserTokenRepository')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists.');
    }
    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
