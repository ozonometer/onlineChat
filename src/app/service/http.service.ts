import {environment} from '../../environments/environment';
import {HttpClient, HttpEventType, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {UserModel} from '../model/UserModel';
import {AuthRequest} from "../model/AuthRequest";
import {AuthResponse} from "../model/AuthResponse";
import {NewUserModel} from "../model/NewUserModel";

@Injectable( {providedIn: 'root'})
export class HttpService {
  private jwtToken;

  constructor(private http: HttpClient) {
    this.jwtToken = '';
  }

  setToken(val: string){
    this.jwtToken = val;
  }

  getToken(){
    return this.jwtToken;
  }

/*
  getRequest(path: string): Observable<{}> {
      return this.http.get(environment.url + path);
  }

  postRequest(path: string, data: object): Observable<{}>  {
    return this.http.post( environment.url + path, data);
  }
*/

  /**
   * POST to authenticate user
   */
  async postAuthenticateUser(username: string, pass: string){
    let authRequest: AuthRequest = {
      userName: username,
      password: pass
    }
    return this.http.post(environment.url + '/authenticate', authRequest)
      .pipe(map( res => res as AuthResponse)).toPromise().then( data => {
        console.log(data);
        return data;
      });
  }

  /**
   * POST to create new user
   */
  async postNewUser(newUser: NewUserModel){
    return this.http.post(environment.url + '/createUser', newUser)
      .pipe(map( res => res as UserModel)).toPromise().then( data => {
      return data;
    });
  }

  /**
   * GET list of all users
   */
  async getAllUsers(){
    const headers = new HttpHeaders({Authorization: 'Token ' + this.jwtToken})
    return this.http.get(environment.url + '/users', {headers})
      .pipe(map( res => res as Array<UserModel>)).toPromise().then( data => {
        return data;
      });
  }

  /**
   * GET user by id
   */
  /*async getUser(id: number){
    return this.http.get(environment.url + '/user/' + id)
      .pipe(map( res => res as UserModel)).toPromise().then( data => {
        return data;
      });
  }*/
}
