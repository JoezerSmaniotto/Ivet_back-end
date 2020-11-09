declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}

// Desta forma estou adicionando ao request o obj user
