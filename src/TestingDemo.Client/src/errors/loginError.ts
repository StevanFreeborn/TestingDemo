export class LoginError extends Error {
  data: object;

  constructor(message: string, data: object) {
    super(message);
    this.name = 'LoginError';
    this.data = data;
  }
}
