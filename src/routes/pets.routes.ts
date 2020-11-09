import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import PetsRepository from '../repositories/PetsRepository';
import CreatePetService from '../services/CreatePetService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const petsRouter = Router();

// Como todas as rotas (get,post, ...) precisam de autenticação, passa o com USE para todas as rotas atraves do petsRouter
petsRouter.use(ensureAuthenticated);

petsRouter.get('/', async (request, response) => {
  const petsRepository = getCustomRepository(PetsRepository);
  const pet = await petsRepository.find();

  return response.json(pet);
});

petsRouter.post('/', async (request, response) => {
  // try {
  const {
    userId,
    namePet,
    racaPet,
    sexo,
    dataNasc,
    observacao,
    img,
  } = request.body;

  const parseDate = parseISO(dataNasc);

  const createPet = new CreatePetService();

  const pet = await createPet.exceute({
    userId,
    namePet,
    racaPet,
    sexo,
    dataN: parseDate,
    observacao,
    img,
  });

  return response.json(pet);
  // } catch (err) {
  return response.status(400).json({ error: err.message });
  // }
});

export default petsRouter;
