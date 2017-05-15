import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { FacebookModule } from 'ng2-facebook-sdk';
import { UserAuthComponent } from './user-auth/user-auth.component';

import { userAuthService } from './user-auth/user-auth.service';


@NgModule({
  declarations: [
    AppComponent,
    UserAuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FacebookModule.forRoot()
  ],
  providers:[userAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
