/*
Requirement 1.2 User Authenticated
Requirement 1.2.1 User will have the option to create new thread.
 */
import { Component, OnInit } from '@angular/core';
import {Thread} from "../model/Thread";
import {HttpService} from "../service/http.service";
import {Router} from "@angular/router";
import {ToastWrapper} from "../model/ToastWrapper";
import {ToastService} from "../service/toast.service";
import {ToastType} from "../model/ToastType";
import {HttpErrorResponse} from "../model/HttpErrorResponse";
import Utils from "../utils/Utils";

@Component({
  selector: 'app-new-thread',
  templateUrl: './new-thread.component.html',
  styleUrls: ['./new-thread.component.css']
})
export class NewThreadComponent implements OnInit {

  newThread: Thread;
  name: string;
  description: string;
  constructor(private httpService: HttpService, private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
  }

  createThread() {
  this.newThread = {
    threadId: 0,
    authorId: Utils.getUserId(),
    authorUserName: Utils.getUserName(),
    threadName: this.name,
    threadDescription: this.description,
    createdDate: new Date()
  }
  console.log(this.newThread);
  this.httpService.postNewThread(this.newThread).then(response => {
    if (response!.threadId) {
      this.toastService.emmitToast(new ToastWrapper(ToastType.SUCCESS, new HttpErrorResponse(),
        'Thread created successfully'));
      localStorage.setItem('threadId', response!.threadId.toString());
      this.router.navigate(['/message-home']);
    } else {
      this.toastService.clearToastMessages();
      this.toastService.emmitToast(
        new ToastWrapper(ToastType.ERROR, new HttpErrorResponse, 'Something went wrong while creating new thread!'));
    }
  }, err => {
    this.toastService.clearToastMessages();
    this.toastService.emmitToast(new ToastWrapper(ToastType.ERROR, err, ''));
  })

  }
}
