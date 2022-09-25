/**
 * Class is used to create new User
 */

export class NewUserModel {
  public firstName: string;
  public lastName: string;
  public userName: string;
  public password: string;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.userName = '';
    this.password = '';
  }
}
