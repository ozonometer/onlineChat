import {Component, OnInit} from '@angular/core';
import {HttpService} from "../service/http.service";
import {AuthResponse} from "../model/AuthResponse";
import {Router} from '@angular/router';
import {ToastService} from '../service/toast.service';
import {ToastWrapper} from '../model/ToastWrapper';
import {ToastType} from '../model/ToastType';
import {HttpErrorResponse} from "../model/HttpErrorResponse";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  private authResponse: AuthResponse;
  constructor(private httpService: HttpService, private router: Router, private toastService: ToastService) {

  }

  ngOnInit(): void {
  }

  userLogin() {
    this.toastService.clearToastMessages();
    this.httpService.postAuthenticateUser(this.username, this.password).then(response => {
      this.authResponse = response!;
      this.httpService.setToken(this.authResponse.token);
      this.httpService.setUserId(this.authResponse.userId);
      this.router.navigate(['/home']);
      this.toastService.emmitToast(new ToastWrapper(ToastType.SUCCESS, new HttpErrorResponse(),
        'Login Successful'));
    }, err => {
      this.toastService.clearToastMessages();
      this.toastService.emmitToast(new ToastWrapper(ToastType.ERROR, err, ''));
    })
  }
}
