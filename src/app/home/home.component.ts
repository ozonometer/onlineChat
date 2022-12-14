/*
Requirement 1.2 User Authenticated
Requirement 1.2.1 User will have the option to create new threads.
Requirement 1.2.2 User will be able to search threads by keyword.
 */
import { Component, OnInit } from '@angular/core';
import {HttpService} from '../service/http.service';
import {WebsocketService} from "../service/websocket.service";
import {Thread} from "../model/Thread";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  threads : Array<Thread>;
  message: string;
  showModal: boolean = false;
  block: string;
  keyword: string = '';
  page: number = 1;
  totalLength: any;

  //HTTP Service
  constructor(private httpService: HttpService, private websocket: WebsocketService, private router: Router) {
  }

  //Loads threads
  ngOnInit(): void {
    this.httpService.getAllThreads().then(response => {
      this.threads = response!;
    })
  }

  connectSocket() {
    this.websocket._connect();
  }

  disconnect() {
    this.websocket._disconnect();
  }


  send() {
    this.websocket._send(this.message);
  }

  createNew() {
    this.showModal = true;
    this.block = 'block';
    this.router.navigate(['/new-thread']);
  }

  goToThread(threadId: number) {
    localStorage.setItem('threadId', threadId.toString());
    this.router.navigate(['/message-home']);
  }

  searchKeyword() {
    this.httpService.searchKeyword(this.keyword).then(response => {
      this.threads = response!;
    })
  }
}
