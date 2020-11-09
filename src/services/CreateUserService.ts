import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs'; // Senha criptografada

import AppError from '../errors/AppError';

import User from '../models/User';

interface Resquest {
  name: string;
  email: string;
  password: string;
  birthDate: Date;
  cep: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  UF: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    birthDate,
    cep,
    street,
    number,
    complement,
    district,
    city,
    UF,
  }: Resquest): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email }, // email: email
    });

    if (checkUserExists) {
      throw new AppError('Email addres already used.');
    }

    const hashedPassword = await hash(password, 8); // Senha criptografada

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,

      birthDate,
      cep,
      street,
      number,
      complement,
      district,
      city,
      UF,
    });

    await usersRepository.save(user);

    delete user.password; // Assim não retorno a senha do usuario criado

    return user;
  }
}

export default CreateUserService;
