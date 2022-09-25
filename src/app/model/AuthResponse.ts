export class AuthResponse {
  public token: string;
  public message: string;

  constructor() {
    this.token = '';
    this.message = '';
  }
}
