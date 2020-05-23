import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarServer {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      // Deletar avatar anterior
      // path.join: unir dois caminhos.
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      // Verifica se o arquivo existe, a função stat ela tras o status de um arquivo
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        // se o arquivo existir deletamos ele usando o unlink
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    // Save: ele cria um usuario se n tiver um usuario, se tiver um id ele atualiza
    // as informações que alteramos
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarServer;
