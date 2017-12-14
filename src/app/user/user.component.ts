import { Component, OnInit } from '@angular/core';
import { User } from '../service/user';
import { UserService } from '../service/user.service';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers : [UserService]
})
export class UserComponent implements OnInit {

	users : User[];

  	constructor(
  		private router : Router, 
  		private userService : UserService
  	) { };

  	
  	getAllUsers(): void{
  		this.userService.getAllUsers()
  		.then(users => {
  			//console.log(users['data']);
            this.users = users['data'];
  		});
  	}

  	ngOnInit() {
  		this.getAllUsers();
  	}

    update(id: string): void {
      this.router.navigate(['/updateuser', id]);
    }

  	viewDetail(id: string): void {
	    this.router.navigate(['/detailuser', id]);
	}



}
