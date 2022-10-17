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

  public user: UserModel = new UserModel();
  public userImage = '';
  public imageId = '';

  constructor(private httpService: HttpService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.httpService.getUser().then(response => {
      this.user = response!;
      this.user.id = response?._id!;
      this.getImage();
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

  addImage(event: Event) {
    this.toastService.clearToastMessages();
    console.log(event);
    let canUpload = true;
    // @ts-ignore
    if(event.target.files[0].type !== 'image/png' && event.target.files[0].type !== 'image/jpeg') {
      this.toastService.emmitToast(new ToastWrapper(ToastType.ERROR, new HttpErrorResponse, 'Only PNG and JPG images are allowed!'));
      canUpload = false;
    }
    // @ts-ignore
    if (event.target.files[0].size > 200000) {
      this.toastService.emmitToast(new ToastWrapper(ToastType.ERROR, new HttpErrorResponse, 'Image has to be 200KB or less!'));
      canUpload = false;
    }
    if (canUpload) {
      // @ts-ignore
      this.httpService.uploadMultipartFile(event.target.files[0], 'picture').then(response => {
        if(response) {
          this.getImage();
          this.toastService.emmitToast(new ToastWrapper(ToastType.SUCCESS, new HttpErrorResponse(),
            'Image Uploaded Successfully.'));
        }
      }, err => {
        console.log(err)
        this.toastService.emmitToast(new ToastWrapper(ToastType.ERROR, err, ''));
      })
    }
  }

  getImage() {
    this.httpService.getUserImage().then(resp => {
      this.userImage = resp?.image!;
      this.imageId = resp?.id!;
      localStorage.setItem('imageId', this.imageId);
    })
  }

  deleteImage() {
    this.httpService.postDeleteUserPicture(this.imageId).then(response => {
      if(response) {
        this.toastService.emmitToast(new ToastWrapper(ToastType.SUCCESS, new HttpErrorResponse(),
          'Profile Image Deleted'));
        this.getImage();
      }
    }, err => {
      this.toastService.emmitToast(new ToastWrapper(ToastType.ERROR, err, ''));
    })
  }

  toggleHide() {
    let x = document.getElementById("profilePassword");
    console.dir(x);
    // @ts-ignore
    if (x.type === "password") {
      // @ts-ignore
      x.type = "text";
    } else {
      // @ts-ignore
      x.type = "password";
    }
  }
}
