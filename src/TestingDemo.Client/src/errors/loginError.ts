export class LoginError extends Error {
  response: any;

  constructor(message: string, response: any) {
    super(message);
    this.name = 'LoginError';
    this.response = response;
  }
}
