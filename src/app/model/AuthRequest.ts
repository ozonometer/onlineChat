/**
 * Class for user authentication
 */
export class AuthRequest {
  public userName: string;
  public password: string;

  constructor() {
    this.userName = '';
    this.password = '';
  }
}
