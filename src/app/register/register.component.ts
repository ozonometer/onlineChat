/*
Requirement 1.1. Main Page
Requirement 1.1.2 User Registration.
 */
import { Component, OnInit } from '@angular/core';
import {HttpService} from "../service/http.service";
import {Router} from "@angular/router";
import {NewUserModel} from "../model/NewUserModel";
import {ToastWrapper} from "../model/ToastWrapper";
import {ToastType} from "../model/ToastType";
import {HttpErrorResponse} from "../model/HttpErrorResponse";
import {ToastService} from "../service/toast.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;

  constructor(private httpService: HttpService, private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
  }

  createUser() {
    let newUser: NewUserModel = {
    firstName: this.firstName,
    lastName: this.lastName,
    userName: this.userName,
    password: this.password
    }
    this.toastService.clearToastMessages();
      this.httpService.postNewUser(newUser).then(response => {
        console.log(response);
        this.router.navigate(['/login']);
        this.toastService.emmitToast(new ToastWrapper(ToastType.SUCCESS, new HttpErrorResponse(),
          'User created successfully. Please login.'))
      }, err => {
        this.toastService.clearToastMessages();
        this.toastService.emmitToast(new ToastWrapper(ToastType.ERROR, err, ''));
      })
  }
}
