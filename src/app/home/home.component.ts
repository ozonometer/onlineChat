import { Component, OnInit } from '@angular/core';
import {HttpService} from '../service/http.service';
import {UserModel} from "../model/UserModel";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users : Array<UserModel>;

  constructor(private httpService: HttpService) {
    this.httpService.getAllUsers().then(response => {
      this.users = response!;
    })
  }

  ngOnInit(): void {}

}
