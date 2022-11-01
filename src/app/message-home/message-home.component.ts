import { Component, OnInit } from '@angular/core';
function randint(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

@Component({
  selector: 'app-message-home',
  templateUrl: './message-home.component.html',
  styleUrls: ['./message-home.component.css']
})
export class MessageHomeComponent implements OnInit {

  constructor() { }

  msg( message: any, timestamp = Date.now()) {
    return {
      message,
      timestamp,
    }
  }

  send(msg: any) {
    return this.msg(msg)
  }
  recv(msg: any) {
    return this.msg(msg)
  }

  messages: any[] = []

  msgInterval = randint(500, 1500)
  msgs = [{
    action: 'send',
    msg: `Test`
  },
  ]

  nextMsg() {
    if (this.msgs.length) {
      const msg = this.msgs[0]
      this.messages.push((msg.msg))
      this.msgs = this.msgs
        .splice(1, this.msgs.length)
    } else {
      clearInterval(this.msgInterval)
    }
  }

  ngOnInit() {
    this.nextMsg()
  }

  ngOnDestroy() {
    clearInterval(this.msgInterval)
  }

}
