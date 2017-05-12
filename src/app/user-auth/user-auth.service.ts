import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { User } from './user-auth.module';

@Injectable()

export class userAuthService{
  constructor(private http:Http){

  }

  userAuthenticationService(userObj):Observable<any>{
    let userData = JSON.stringify(userObj);
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this.http.post('http://localhost:3000/user/newuser', userData, options)
      .map((response:Response)=>response.json());
  }
}
