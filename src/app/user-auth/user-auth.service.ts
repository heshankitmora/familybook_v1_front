import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers, RequestOptions } from '@angular/http';
import { User } from './user-auth.module';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


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

  userRelationshipAddService(userRelations, userActiveSession):Observable<any>{
    let userRelationsData = JSON.stringify(userRelations);
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});

    return this.http.post('http://localhost:3000/user/familydata?userActiveSession='+userActiveSession, userRelationsData, options)
      .map((response:Response)=>response.json());
  }
}
