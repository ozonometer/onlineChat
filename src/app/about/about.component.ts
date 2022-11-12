import { Component, OnInit } from '@angular/core';
import { HttpService } from "../service/http.service";
import {Constants} from "../utils/Constants";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  backEndVersion: string;
  frontEndVersion = Constants.FRONT_END_VERSION;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getAboutInfo().then(response => {
      this.backEndVersion = response!.backendVersion;
    }, err => {
      console.log('Error getting back-end version' + err)
    })
  }

}
