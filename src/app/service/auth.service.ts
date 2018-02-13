import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import 'rxjs/add/operator/toPromise';
import { User } from './user';

@Injectable()
export class AuthService {

	private redirectUrl: string;
	private loginUrl: string = '/login';
	private isloggedIn: boolean = false;
	private loggedInUser: User;
	public token: string;

  	constructor(private userService : UserService) {
  		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  		if(currentUser != null){
  			this.token = currentUser.token;
  		}
  	}

  	isUserAuthenticated(matricule: number, password:string): Promise<boolean> {	 
	 	return this.userService.getUserLogin(matricule, password)
	 		.then(users => {
	 			//console.log(users);
	 			let user = users['data'];
	 			let token = users['token'];
	 			
	 			if(user && token) {
	 				if(user.level == 'admin'){
	 					this.redirectUrl = '/user';
	 				}else{
	 					this.redirectUrl = '/inbox';
	 				}
	 				this.token = token;

	 				localStorage.setItem('currentUser', JSON.stringify({user : user, token: token}));

	 				this.isloggedIn = true;
	 				this.loggedInUser = user;
	 			}else{
	 				this.isloggedIn = false;
	 			}
	 			return this.isloggedIn;
	 		});
    
    }

	isUserLoggedIn(): boolean {
		return this.isloggedIn;
	}

	getRedirectUrl(): string {
		return this.redirectUrl;
	}

	setRedirectUrl(url: string): void {
		this.redirectUrl = url;
	}

	getLoginUrl(): string {
		return this.loginUrl;
	}

	getLoggedInUser(): User {
		return this.loggedInUser;
	}

	logoutUser(): void{
		this.token = null;
		localStorage.removeItem('currentUser');
		this.isloggedIn = false;
	}



}
