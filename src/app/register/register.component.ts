import { Component, OnInit } from '@angular/core';
import {HttpService} from "../service/http.service";
import {Router} from "@angular/router";
import {NewUserModel} from "../model/NewUserModel";

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

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
  }

  createUser() {
    let newUser: NewUserModel = {
    firstName: this.firstName,
    lastName: this.lastName,
    userName: this.userName,
    password: this.password
    }
      this.httpService.postNewUser(newUser).then(response => {
        console.log('Create new User');
        console.log(response);
        this.router.navigate(['/login']);
      }, error => {
        console.log('Error during user authentication! ');
        console.log(error);
      })
  }
}
