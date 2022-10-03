import { Component, OnInit } from '@angular/core';
import {UserModel} from "../model/UserModel";
import {HttpService} from "../service/http.service";
import {ToastWrapper} from "../model/ToastWrapper";
import {ToastType} from "../model/ToastType";
import {ToastService} from "../service/toast.service";
import {HttpErrorResponse} from "../model/HttpErrorResponse";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: UserModel;

  constructor(private httpService: HttpService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.httpService.getUser().then(response => {
      this.user = response!;
      this.user.id = response?._id!;
    }, err => {
      this.toastService.emmitToast(new ToastWrapper(ToastType.ERROR, err, ''));
    })
  }

  updateUser(): void {
    this.toastService.clearToastMessages();
    this.httpService.postUpdateUser(this.user).then(response => {
      if (response?._id) {
        this.toastService.emmitToast(new ToastWrapper(ToastType.SUCCESS, new HttpErrorResponse(),
          'Profile Updated Successfully.'));
      }
    }, err => {
      this.toastService.clearToastMessages();
      this.toastService.emmitToast(new ToastWrapper(ToastType.ERROR, err, ''));
    })
  }
}
