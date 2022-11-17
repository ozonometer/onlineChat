import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(public messageService: MessageService) {}

  webSocketEndPoint: string = environment.url + '/ws';
  topic: string = '/topic/liveChat/'
  sentTo: string = '/send/new/'
  stompClient: any;
  sockJsProtocols = ["xhr-streaming", "xhr-polling"];

  _setPathVar(threadId: string) {
    this.topic = this.topic + threadId;
    this.sentTo = this.sentTo + threadId;
  }

  _connect() {
    let ws = new SockJS(this.webSocketEndPoint, null, {transports: this.sockJsProtocols});
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame: any) {
      _this.stompClient.subscribe(_this.topic, function (sdkEvent: any) {
        _this.onMessageReceive(sdkEvent);
      });
    }, (error: string) => {
      setTimeout(this._connect, 5000)
    });
  };

  _disconnect() {
    if(this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }

  _send(message: any) {
    this.stompClient.send(this.sentTo, {}, JSON.stringify(message));
  }

  onMessageReceive(sdkEvent: any) {
    let stringVar = new TextDecoder().decode(sdkEvent._binaryBody);
    let content = JSON.parse(stringVar);
    let obj = JSON.parse(content.content);
    this.messageService.add(obj);
  }
}
