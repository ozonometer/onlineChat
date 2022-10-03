import { Component, OnInit } from '@angular/core';
import {HttpService} from "../service/http.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  loggedIn(): boolean {
    return this.httpService.isLoggedIn();
  }
}
