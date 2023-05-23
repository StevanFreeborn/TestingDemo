export class ResetPasswordError extends Error {
  response: any;

  constructor(message: string, response: any) {
    super(message);
    this.name = 'ResetPasswordError';
    this.response = response;
  }
}
