import { Component, OnInit, ViewChild } from '@angular/core';
import { userAuthService } from './user-auth.service';
import { Router } from "@angular/router";
import {FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent} from 'ng2-facebook-sdk';
import {SharedService} from '../app.service'

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  @ViewChild(FBVideoComponent) video: FBVideoComponent;
  constructor(
    private fb: FacebookService,
    private userAuthService:userAuthService,
    private router:Router,
    private sharedService:SharedService
  ) {
    fb.init({
      appId: '235789543562027',
      version: 'v2.8'
    });
  }

  login() {
    console.log('123');
    this.fb.login()
      .then((res: LoginResponse) => {
        console.log(res);
        var self = this;
        this.fb.api('/me?fields=id,name,picture.type(large)')
          .then((resultUser: any) => {
            var imgUrl = resultUser.picture.data.url;
            console.log(resultUser.picture.data.url);
            var self_service = this;
            this.userAuthService.userAuthenticationService(resultUser).subscribe(
              response=>{
                if(response._id != ''){
                  var userId = resultUser.id;

                  //Success Message
                  var userActiveSession = response.userActiveSession;
                  console.log('succeeded');
                  self.fb.api('/me/family')
                    .then((res: any) => {
                      self_service.userAuthService.userRelationshipAddService(res, userActiveSession).subscribe(
                        response_fam=>{
                          console.log(response_fam);
                          self_service.userAuthService.userRelationshipsNetworkViewService(userId,userActiveSession).subscribe(
                            response_data=>{
                              this.sharedService.insertUserData(response_data);
                              this.sharedService.insertImg(imgUrl);
                              this.router.navigate(['userprofile']);

                             // console.log(response_data);
                            }
                          )


                        }
                      )

                      self_service.userAuthService.userRelationshipsNetworkViewAllDetailService(res, userActiveSession).subscribe(
                        response_fam=>{
                          console.log(response_fam);
                          self_service.userAuthService.userRelationshipsNetworkViewService(userId,userActiveSession).subscribe(
                            response_data=>{
                              console.log(response_data);
                            }
                          )


                        }
                      )

                    })

                }
                else{
                  'Error Occured'
                }
              }
            )

          })


        this.getFamily();
      })

  }

  /**
   * Login with additional permissions/options
   */
  loginWithOptions() {

    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,user_friends,email,pages_show_list,family,user_relationships,friends_relationships'
    };

    this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        console.log('Logged in', res);
      })

  }

  getLoginStatus() {
    this.fb.getLoginStatus()
      .then(console.log.bind(console))

  }


  /**
   * Get the user's profile
   */
  getFamily() {
    this.fb.api('/me/family')
      .then((res: any) => {
        console.log('Got the users profile', res);
      })

  }


  /**
   * Get the users friends
   */
  getFriends() {
    this.fb.api('/me/permissions')
      .then((res: any) => {
        console.log('Got the users friends', res);
      })

  }


  /**
   * Show the share dialog
   */
  share() {

    const options: UIParams = {
      method: 'share',
      href: 'https://github.com/zyramedia/ng2-facebook-sdk'
    };

    this.fb.ui(options)
      .then((res: UIResponse) => {
        console.log('Got the users profile', res);
      })


  }


  playVideo() {
    this.video.play();
  }

  onVideoEvent(ev) {
    console.log('Video event fired: ' + ev);
  }

  pauseVideo() {
    this.video.pause();
  }



  /**
   * This is a convenience method for the sake of this example project.
   * Do not use this in production, it's better to handle errors separately.
   * @param error
   */
  private handleError(error) {
    console.error('Error processing action', error);
  }

  ngOnInit() {
  }

}
