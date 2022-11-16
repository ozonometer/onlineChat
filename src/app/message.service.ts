import { Injectable } from '@angular/core';
import {UserModel} from "./model/UserModel";
import {HttpService} from "./service/http.service";

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: string[] = [];
  currentUser : UserModel;

  constructor(private httpService: HttpService) {
    this.httpService.getUser().then(response => {
      this.currentUser = response!;
    })
  }


  add(message: string) {
    let currentDate = new Date().toLocaleTimeString();
    this.messages.push(message,('Sent by: '+this.currentUser.firstName.toString()),(currentDate.toString()));
  }

  clear() {
    this.messages = [];
  }
}
