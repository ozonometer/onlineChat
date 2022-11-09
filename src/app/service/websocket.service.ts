import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() {}

  webSocketEndPoint: string = environment.url + '/ws';
  topic: string = '/topic/liveChat'
  stompClient: any;
  sockJsProtocols = ["xhr-streaming", "xhr-polling"];
  _connect() {
    console.log('--------initialize websocket connection');
    let ws = new SockJS(this.webSocketEndPoint, null, {transports: this.sockJsProtocols});
    this.stompClient = Stomp.over(ws);
    console.log('--- websocket end point ' + this.webSocketEndPoint);
    const _this = this;
    _this.stompClient.connect({}, function (frame: any) {
      console.log(frame);
      _this.stompClient.subscribe(_this.topic, function (sdkEvent: any) {
        _this.onMessageReceive(sdkEvent);
      });
    }, (error: string) => {
      console.log('-----errorCallback ' + error)
      setTimeout(this._connect, 5000)
    });
  };

  _disconnect() {
    if(this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }

  _send(message: any) {
    console.log('------ calling logout');
    this.stompClient.send('/send/new', {}, JSON.stringify(message));
  }
  /*
  var uint8array = new TextEncoder().encode("¢");
var string = new TextDecoder().decode(uint8array);
   */

  onMessageReceive(sdkEvent: any) {
    console.log('-------- message received')
    console.log(sdkEvent._binaryBody);
    let stringVar = new TextDecoder().decode(sdkEvent._binaryBody);
    console.log(stringVar)
  }
}
