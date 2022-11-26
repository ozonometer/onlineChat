import { Component, OnInit } from '@angular/core';
import {ToastWrapper} from "../model/ToastWrapper";
import {ToastType} from "../model/ToastType";
import {HttpService} from "../service/http.service";
import {WebsocketService} from "../service/websocket.service";
import {Thread} from "../model/Thread";
import {ToastService} from "../service/toast.service";
import {UserModel} from "../model/UserModel";
import {MessageService} from "../service/message.service";
import Utils from "../utils/Utils";

@Component({
  selector: 'app-message-home',
  templateUrl: './message-home.component.html',
  styleUrls: ['./message-home.component.css']
})
export class MessageHomeComponent implements OnInit {
  currentThread: Thread;
  messages: string[] = [];
  currentUser : UserModel;
  message: string;
  userImage: any;

  constructor(private httpService: HttpService, private websocket: WebsocketService, private toastService: ToastService,
              public messageService: MessageService) { }

  ngOnInit() {
    this.httpService.getUser().then(response => {
      this.currentUser = response!;
    })
    this.httpService.getThread().then(response => {
      this.currentThread = response!;
      this.connectSocket();
      this.getUserImage(this.currentThread.authorId);
    }, err => {
      this.toastService.emmitToast(new ToastWrapper(ToastType.ERROR, err, ''));
    })
  }

  ngOnDestroy() {
    this.websocket._disconnect();
  }

  connectSocket() {
    this.websocket._setPathVar(this.currentThread.threadId.toString())
    this.websocket._connect();
  }

  send() {
    let mesg = "{\"userId\":" + Utils.getUserId()
      + ",\"userName\":\""+Utils.getUserName()
      +"\",\"timeStamp\":\""+new Date().toLocaleTimeString()
      +"\",\"message\":\""+this.message+"\"}";
    this.websocket._send(mesg);
    this.message = '';
  }

  getUserImage(id:number){
    this.httpService.getUserImageById(id).then(response => {
      this.userImage = response?.image;
    })
  }
}
