import 'rxjs/add/operator/switchMap'
import { Component, OnInit } from '@angular/core';
import { User } from '../../service/user';
import { Level } from '../../service/level';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from "../../service/user.service";
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})

export class UserUpdateComponent implements OnInit {

	  userUpdateForm: FormGroup;
  	user: User;
    level: Level;
  	
  	constructor(private userService: UserService,
              	private router: Router,
              	private route: ActivatedRoute,
              	private location: Location,
              	private formBuilder: FormBuilder) { }

  	ngOnInit(): void {
  		this.route.params
  			.switchMap((params: Params) => this.userService.getUser(params['id_user']))
  			.subscribe(user => {
  				this.user = user['data'];
          this.getLevel();
  				this.buildForm();
  			})
  	}

  	buildForm(): void {
  		this.userUpdateForm = this.formBuilder.group({
  			matricule : [this.user.matricule, [Validators.required, Validators.minLength(2), Validators.pattern(/^[0-9]*$/)]],
  			mail : [this.user.mail, [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
  			password : [this.user.password, [Validators.required, Validators.minLength(8)]],
  			level : [this.level],
  			prenom : [this.user.prenom, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
  			id_user : [this.user.id_user]
  		});
  	} 

  	update(): void{
  		let user = this.userUpdateForm.value as User;
  		this.userService.update(user)
  		.then(() => this.router.navigate(['user']));
  	}

    getLevel(): void{
      this.userService.getAllLevel()
      .then(level => { this.level = level['data'] });
    }

  	goBack(): void{
	    this.location.back();
	  }


}
