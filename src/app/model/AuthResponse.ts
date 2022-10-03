export class AuthResponse {
  public token: string;
  public message: string;
  public userId: number;

  constructor() {
    this.token = '';
    this.message = '';
    this.userId = 0;
  }
}
