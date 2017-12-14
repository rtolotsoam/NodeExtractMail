import { Component, OnInit } from '@angular/core';
import { User } from '../../service/user';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from "../../service/user.service";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

	user: User;

  	constructor(
  		private userService: UserService,
   		private route: ActivatedRoute,
    	private location: Location
  	) { };

  	ngOnInit(): void {
  		this.route.params
      	.switchMap((params: Params) => this.userService.getUser(params['id_user']))
      	.subscribe(user => this.user = user['data']);
  	}

  	goBack(): void{
	    this.location.back();
	  }

}
