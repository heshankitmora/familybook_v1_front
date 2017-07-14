import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { FacebookModule } from 'ng2-facebook-sdk';
import { UserAuthComponent } from './user-auth/user-auth.component';

import { userAuthService } from './user-auth/user-auth.service';
import { SharedService } from './app.service';
import { UserProfileComponent } from './user-profile/user-profile.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'userauth', pathMatch: 'full'},
  { path: 'userprofile', component: UserProfileComponent },
  { path:'userauth', component: UserAuthComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserAuthComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FacebookModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers:[userAuthService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
