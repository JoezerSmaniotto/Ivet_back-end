import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(cors());

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    // Se Este err é uma instancia da classe AppError então foi um erro que crie nas rotas
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);
  // Aqui se é um erro que aconteceu na minha api, internamente e eu não esperava
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server Started on port 3333 !');
});
