/**
 * Class is used to map User object
 */

export class UserModel {
  public _id: string;
  public id: string;
  public userId: number;
  public firstName: string;
  public lastName: string;
  public userName: string;
  public password: string;
  public city: string;
  public state: string;
  public zip: string;
  public country: string;

  constructor() {
    this._id = '';
    this.id = '';
    this.userId = 0;
    this.firstName = '';
    this.lastName = '';
    this.userName = '';
    this.password = '';
    this.city = '';
    this.state = '';
    this.zip = '';
    this.country = '';
  }
}
