import { Router } from 'express';
import multer from 'multer';
import UploadConfig from '../config/upload';

import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(UploadConfig); // O upload é uma instancia do multer nele eu tenho acesso alguns metodos

usersRouter.post('/', async (request, response) => {
  // try {
  const {
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
  } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
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
  });

  return response.json(user);
  // } catch (err) {
  return response.status(400).json({ error: err.message });
  // }
});

// Uso o ensureAuthenticated para ver se o usuario esta autenticado, caso que não acontece na rota acima pq ali ele estara logando
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'), // Aqui upload.single('avatar') acaba funcionando como um middleware, e no campo  avatar é nome do campo aonde estará minha imagem de upload
  async (request, response) => {
    // try {
    // console.log(request.file);
    const updateUserService = new UpdateUserAvatarService();

    const user = await updateUserService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json({ user });
    // } catch (err) {
    return response.status(400).json({ error: err.message });
    // }
  },
);

export default usersRouter;
