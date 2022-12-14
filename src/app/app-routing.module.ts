import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from "./login/login.component";
import { HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {MessageHomeComponent} from "./message-home/message-home.component";
import {AboutComponent} from "./about/about.component";
import {NewThreadComponent} from "./new-thread/new-thread.component";

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"login", component:LoginComponent},
  {path:"home", component:HomeComponent},
  {path:"register", component:RegisterComponent},
  {path:"profile", component:ProfileComponent},
  {path:"message-home", component:MessageHomeComponent},
  {path:"about", component:AboutComponent},
  {path:"new-thread", component:NewThreadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
