import { Component, OnInit } from '@angular/core';
import {HttpService} from "../service/http.service";
import {AuthResponse} from "../model/AuthResponse";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  private authResponse: AuthResponse;
  constructor(private httpService: HttpService, private router: Router) {

  }

  ngOnInit(): void {
  }

  userLogin() {
    this.httpService.postAuthenticateUser(this.username, this.password).then(response => {
      this.authResponse = response!;
      this.httpService.setToken(this.authResponse.token)
      this.router.navigate(['/home']);
    }, error => {
      console.log('Error during user authentication!');
      console.log(error);
    })
  }
}
