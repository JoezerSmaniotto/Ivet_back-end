import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    // Aqui é se o user Já tem um avatar então tenho que fazer um D E L E T E do A V A T A R anterior
    if (user.avatar) {
      // Se o metodo usersRepository.findOne(user_id); funcionou, ele me retorno o User com tudo o que ele tem, se já tiver avatar tenho q deletar

      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar); // Aqui junto o camiho para a foto com o nome da foto que estava armazenado no banco de dados
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath); // a Função stat trás o S T A T U S de um arquivo S Ó  se ele E X I S T I R,
      // => fs.promises = o promises faz com que possa usar  as funções do FileSistem em forma de promises e não Callback, desta forma sendo possivel usar o await para aguardar o resultado

      // Se tenho então a foto deleto
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename; // Aqui ele colocar no user.avatar = o nome da nova imagem

    await usersRepository.save(user); // Aqui atraves do UsersRepository ele salva agora apenas o campo alterado neste users
    // o Metodo save ele serve para criar e Alterar
    // O save vai neste user que passei e vê se ele tem um um ID, se não tiver ele cria, se tiver ele altera os campos que foram alterados

    return user;
  }
}

export default UpdateUserAvatarService;
