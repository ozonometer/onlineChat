import { Component, OnInit } from '@angular/core';
import {HttpService} from "../service/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private httpService: HttpService, private router: Router,) { }

  ngOnInit(): void {
  }

  loggedIn(): boolean {
    return this.httpService.isLoggedIn();
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
