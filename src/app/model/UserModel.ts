/**
 * Class is used to map User object
 */

export class UserModel {
  public _Id: number;
  public userId: number;
  public firstName: string;
  public lastName: string;
  public userName: string;
  public password: string;

  constructor() {
    this._Id = 0;
    this.userId = 0;
    this.firstName = '';
    this.lastName = '';
    this.userName = '';
    this.password = '';
  }
}
