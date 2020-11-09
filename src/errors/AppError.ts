class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  // Assim se não passar StatusCode de Default o erro vai ser 400
  constructor(message: string, stratusCode = 400) {
    this.message = message;
    this.statusCode = stratusCode;
  }
}

export default AppError;
