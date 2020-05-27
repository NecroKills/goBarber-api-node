import { getRepository, Repository } from 'typeorm';

import IUsersTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class UsersTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    // cria o repositorio de Appointment
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    // Cria a instancia, por isso não precisa de await
    const userToken = this.ormRepository.create({
      user_id,
    });

    // Salva no banco
    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UsersTokensRepository;
