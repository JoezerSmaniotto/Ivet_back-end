import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs'; // Senha criptografada
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Resquest {
  email: string;
  password: string;
}

interface Response {
  user: User; // tenho uma varivel User que é do tipo User
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Resquest): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // user.password - Senha criptografada
    // password - senha não criptografada

    const passwordMatched = await compare(password, user.password); // O Compare compara senha uma criptografa com uma não criptografada retornano um boolean

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    // No metodo SIGN assinatura coloco algumas coisas
    // 1º Coisas que posso passar do usuario, nome ou permissões para usar depois => payload não é seguro posso pasar NUNCA PASSAR SENHA
    // 2º Chave secreta MD5online para gerar
    // 3º Configurações do token, posso passar o id do usuario=> subject, tempo que vai ficar valida a sessão =>expiresIn
    const token = sign({}, secret, {
      subject: user.id, // iD RETORNA DAQUI SE estiver logado  const user = await usersRepository.findOne({ where: { email } });
      expiresIn, // expiresIn: expiresIn Tempo para ficar logado, estamos usando  1D
    });

    // Se chegou ate aqui o usuario esta autenticado
    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
