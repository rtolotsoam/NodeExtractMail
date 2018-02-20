import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild{

  constructor(
  		private authService : AuthService,
  		private router : Router
  ) { }

  canActivate(route : ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  		let url: string = state.url;
  		//console.log('Url : '+ url);
      //console.log("login : "+this.authService.isUserLoggedIn());
      //console.log("session : "+localStorage.getItem('currentUser'));
  		if(this.authService.isUserLoggedIn() && localStorage.getItem('currentUser')){
  			//console.log("logged");
        return true;
  		}else if(localStorage.getItem('currentUser')){
        //console.log("logged");
        return true;
      }
      //console.log("not logged");
  		this.authService.setRedirectUrl(url);
  		this.router.navigate([ this.authService.getLoginUrl() ]);
  		return false;
  }

  canActivateChild(route : ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

      let loggedInUser = this.authService.getLoggedInUser();

      //console.log(loggedInUser);

      let url: string = state.url;

  		if( loggedInUser.level == 'admin') {
  			return true;
  		} else {
  			console.log('Vous êtes pas autoriser à visiter url : '+ state.url);
  			return false;
  		}
  }

}
