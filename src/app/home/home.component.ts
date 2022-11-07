import { Component, OnInit } from '@angular/core';
import {HttpService} from '../service/http.service';
import {UserModel} from "../model/UserModel";
import {WebsocketService} from "../service/websocket.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users : Array<UserModel>;
  message: string;

  constructor(private httpService: HttpService, private websocket: WebsocketService) {
    this.httpService.getAllUsers().then(response => {
      this.users = response!;
    })
  }

  ngOnInit(): void {}

  connectSocket() {
    this.websocket._connect();
  }

  disconnect() {
    this.websocket._disconnect();
  }


  send() {
    this.websocket._send(this.message);
  }
}
