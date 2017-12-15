import 'rxjs/add/operator/switchMap';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from "@angular/common";
import {Router} from '@angular/router';
import { Level } from '../../service/level';
import { User } from '../../service/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {

	userAddForm: FormGroup;
	user = new User();
	level : Level;

  	constructor(
  		private userService: UserService,
  		private location: Location,
  		private router: Router,
  		private formBuilder: FormBuilder
  	) { 
  		this.getLevel();
  		this.buildForm();
  	};

  	buildForm(): void {
  		this.userAddForm = this.formBuilder.group({
  			matricule : ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[0-9]*$/)]],
  			mail : ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
  			password : ['', [Validators.required, Validators.minLength(8)]],
  			level : ['', Validators.required],
  			prenom : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
  		});
  	}

  	getLevel(): void{
      this.userService.getAllLevel()
      .then(level => { this.level = level['data'] });
    }

    add(): void {
    	let user = this.userAddForm.value as User;
    	this.userService.add(user)
    		.then(response => {
    			console.log('response :', response);
    			this.router.navigate(['/user']);
    		});

    }

    goBack(): void{
    	this.location.back();
  	}


}
