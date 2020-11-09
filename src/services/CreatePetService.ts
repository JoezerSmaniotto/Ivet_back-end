import { getCustomRepository } from 'typeorm';

import Pets from '../models/Pets';
import PetsRepository from '../repositories/PetsRepository';
import AppError from '../errors/AppError';
// import appointmentsRouter from '../routes/appointments.routes';

interface Request {
  // DTO
  userId: string;
  namePet: string;
  racaPet: string;
  sexo: string;
  dataN: Date;
  observacao: string;
  img: string;
}

class CreatePetService {
  public async exceute({
    userId,
    namePet,
    racaPet,
    sexo,
    dataN,
    observacao,
    img,
  }: Request): Promise<Pets> {
    const petsRepository = getCustomRepository(PetsRepository);
    // Apartir disto agora o appointmentsRepository tem todos os metodos, Create,Delete,... para ser executado

    const findPetInSameName = await petsRepository.findByName(namePet, userId);

    if (findPetInSameName) {
      throw new AppError('This Pet name has already been registered by you'); // Aqui não passo statusCode pq quero quer de default ele use o status 400 da classe AppError
    }

    // Cria a instancia mais não salva no banco por esta motivo tenho que usar o save() abaixo
    const pet = petsRepository.create({
      userId,
      namePet,
      racaPet,
      sexo,
      dataNasc: dataN,
      observacao,
      img,
    });

    await petsRepository.save(pet);
    // Aqui com o save() estou salvando no Banco, coisa que não acontecia  com o create, pois ele gera apenas uma instancia

    return pet;
  }
}

export default CreatePetService;
