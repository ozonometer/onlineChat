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

  constructor(private http: HttpClient) {
  }

  setToken(val: string){
    localStorage.setItem('jwtToken', val);
    if (val.length > 130) {
      localStorage.setItem('loggedIn', 'true');
    }
  }

  getToken(){
    return localStorage.getItem('jwtToken');
  }


  isLoggedIn(): boolean {
    let logged = localStorage.getItem('loggedIn');
    return logged === 'true';
  }

  getUserId(): number {
    let userId = localStorage.getItem('userId');
    if (userId) {
      return Number(userId);
    }
    return 0;
  }

  setUserId(id: number) {
    localStorage.setItem('userId', String(id));
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
    const headers = new HttpHeaders({Authorization: 'Token ' + this.getToken()})
    return this.http.get(environment.url + '/users', {headers})
      .pipe(map( res => res as Array<UserModel>)).toPromise().then( data => {
        return data;
      });
  }

  /**
   * GET user by id
   */
  async getUser(){
    const headers = new HttpHeaders({Authorization: 'Token ' + this.getToken()})
    return this.http.get(environment.url + '/user/' + this.getUserId(), {headers})
      .pipe(map( res => res as UserModel)).toPromise().then( data => {
        return data;
      });
  }

  /**
   * POST update existing user
   */
  async postUpdateUser(user: UserModel){
    const headers = new HttpHeaders({Authorization: 'Token ' + this.getToken()})
    return this.http.post(environment.url + '/updateUser', user, {headers})
      .pipe(map( res => res as UserModel)).toPromise().then( data => {
        return data;
      });
  }
}
