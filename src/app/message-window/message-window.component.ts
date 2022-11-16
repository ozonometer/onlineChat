import { Component, OnInit } from '@angular/core';
import {MessageService} from "../message.service";

@Component({
  selector: 'app-message-window',
  templateUrl: './message-window.component.html',
  styleUrls: ['./message-window.component.css']
})

export class MessageWindowComponent implements OnInit {

  constructor(public messageService: MessageService) {}

  ngOnInit() {
  }


}
