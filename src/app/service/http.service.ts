import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {UserModel} from '../model/UserModel';
import {AuthRequest} from "../model/AuthRequest";
import {AuthResponse} from "../model/AuthResponse";
import {NewUserModel} from "../model/NewUserModel";
import {Image} from "../model/Image";
import {AboutModel} from "../model/AboutModel";
import {Thread} from "../model/Thread";
import Utils from "../utils/Utils";

@Injectable( {providedIn: 'root'})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  setToken(val: string) {
    localStorage.setItem('jwtToken', val);
    if (val.length > 130) {
      localStorage.setItem('loggedIn', 'true');
    }
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }


  isLoggedIn(): boolean {
    let logged = localStorage.getItem('loggedIn');
    return logged === 'true';
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
  async postAuthenticateUser(username: string, pass: string) {
    localStorage.setItem('userName', username);
    let authRequest: AuthRequest = {
      userName: username,
      password: pass
    }
    return this.http.post(environment.url + '/authenticate', authRequest)
      .pipe(map(res => res as AuthResponse)).toPromise().then(data => {
        //console.log(data);
        return data;
      });
  }

  /**
   * POST to create new user
   */
  async postNewUser(newUser: NewUserModel) {
    return this.http.post(environment.url + '/createUser', newUser)
      .pipe(map(res => res as UserModel)).toPromise().then(data => {
        return data;
      });
  }

  /**
   * GET list of all users
   */
  async getAllUsers() {
    const headers = new HttpHeaders({Authorization: 'Token ' + this.getToken()})
    return this.http.get(environment.url + '/users', {headers})
      .pipe(map(res => res as Array<UserModel>)).toPromise().then(data => {
        return data;
      });
  }

  /**
   * GET user by id
   */
  async getUser() {
    const headers = new HttpHeaders({Authorization: 'Token ' + this.getToken()})
    return this.http.get(environment.url + '/user/' + Utils.getUserId(), {headers})
      .pipe(map(res => res as UserModel)).toPromise().then(data => {
        return data;
      });
  }

  /**
   * POST update existing user
   */
  async postUpdateUser(user: UserModel) {
    const headers = new HttpHeaders({Authorization: 'Token ' + this.getToken()})
    return this.http.post(environment.url + '/updateUser', user, {headers})
      .pipe(map(res => res as UserModel)).toPromise().then(data => {
        return data;
      });
  }

  /**
   * POST to upload image
   */
  async uploadMultipartFile(file: File, type: string): Promise<Object | undefined> {
    const headers = new HttpHeaders({Authorization: 'Token ' + this.getToken()})
    const fd = new FormData();
    fd.append(type, file, file.name);
    return this.http.post(environment.url + "/addUserPicture/"  + Utils.getUserId(), fd, {headers})
      .pipe(map(res => res))
      .toPromise().then(data => {
        return data
      });
  }

  async getUserImage() {
    const headers = new HttpHeaders({Authorization: 'Token ' + this.getToken()})
    return this.http.get(environment.url + '/getUserPicture/' + Utils.getUserId(), {headers})
      .pipe(map(res => res as Image)).toPromise().then(data => {
        return data;
      });
  }

  /**
   * POST delete user picture
   */
  async postDeleteUserPicture(id: string) {
    const headers = new HttpHeaders({Authorization: 'Token ' + this.getToken()})
    return this.http.post(environment.url + '/deleteUserPicture/' + id, '', {headers})
      .pipe(map(res => res as boolean)).toPromise().then(data => {
        return data;
      });
  }

  async getAboutInfo() {
    const headers = new HttpHeaders({Authorization: 'Token ' + this.getToken()})
    return this.http.get(environment.url + '/about/backend', {headers})
      .pipe(map(res => res as AboutModel)).toPromise().then(data => {
        return data;
      });
  }

  /**
   * POST to create new thread
   */
  async postNewThread(newThread: Thread) {
    const headers = new HttpHeaders({Authorization: 'Token ' + this.getToken()})
    return this.http.post(environment.url + '/threads/createThread', newThread, {headers})
      .pipe(map(res => res as Thread)).toPromise().then(data => {
        return data;
      });
  }

  async getAllThreads() {
    const headers = new HttpHeaders({Authorization: 'Token ' + this.getToken()})
    return this.http.get(environment.url + '/threads/all', {headers})
      .pipe(map(res => res as Array<Thread>)).toPromise().then(data => {
        return data;
      });
  }

  /**
   * GET thead by id
   */
  async getThread() {
    const headers = new HttpHeaders({Authorization: 'Token ' + this.getToken()})
    return this.http.get(environment.url + '/threads/getThead/' + Utils.getThreadId(), {headers})
      .pipe(map(res => res as Thread)).toPromise().then(data => {
        return data;
      });
  }
}
