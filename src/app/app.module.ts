import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ToastComponent } from './toast/toast.component';
import { ToastService } from './service/toast.service';
import { ProfileComponent } from './profile/profile.component';
import { MessageHomeComponent } from './message-home/message-home.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageWindowComponent } from './message-window/message-window.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ToastComponent,
    ProfileComponent,
    MessageHomeComponent,
    MessageListComponent,
    MessageWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
