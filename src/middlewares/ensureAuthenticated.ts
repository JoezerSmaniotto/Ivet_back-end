import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/AppError'; // ok

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  //  Verifica se tem token JWT, se ele foi enviado pelo header da requisão
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('JTW token missing', 401);
  }

  // Caso tenha o token
  // Bearer e token recebo,  por isso irei divido por espaço  // Caso passou
  // O Bearer sempre aparece msm eu não colocando ele lá, ele vem por padrão COLOCANDO ELE direto no BEARER do insominia
  const [, token] = authHeader.split(' '); // como não quero o Bearer deixo em branco seu campo como posso ver [, token], pego apenas a segunda posição via desestruturação

  try {
    const decode = verify(token, authConfig.jwt.secret); // Aqui passo o token e a  secret para saber se esta tudo ok, SE SIM retorno as informações do token já PRONTAS decodificadas
    // neste decode irá estar decodificado e posso encontrar o sub que é o ID do usuário

    // Se passar o mouse sobre o decode, o retono na autenticação ele não sabe o formato q ele vai ter, ele pode ser de qualquer tipo, com as informações postas para gerar o token
    const { sub } = decode as TokenPayload; // Se não usar a interface e AS para FORÇAR o formato ele vai dizer que que sub não existe no tipo string ou objetos, mas ele não sabe o formato deste objeto, por isso não consegue encontrar a informação

    request.user = {
      // faço isso para que assim sempre que fazer uma requisição tenha acesso ao ID, no entanto request não tem essa
      // o user, por isso terei q fazer um macete para sobrescrecer tipos de uma biblioteca da nossa aplicação
      // Por este motivo crio a pasta @types e arquivo express.d.ts
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JTW token', 401);
  }
}
