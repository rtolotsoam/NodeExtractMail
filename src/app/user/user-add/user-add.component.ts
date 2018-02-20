import 'rxjs/add/operator/switchMap';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from "@angular/common";
import { Router } from '@angular/router';
import { Level } from '../../service/level';
import { User } from '../../service/user';
import { UserService } from '../../service/user.service';
import { LevelService } from '../../service/level.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {

	userAddForm: FormGroup;
	user = new User();
	level : Level;
  invalidCredentialMsg : String;

  	constructor(
  		private userService: UserService,
  		private location: Location,
  		private router: Router,
  		private formBuilder: FormBuilder,
      private levelService : LevelService
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
      this.levelService.getAllLevel()
      .then(level => { this.level = level['data'] });
    }

    add(): void {
    	let user = this.userAddForm.value as User;
    	this.userService.add(user)
    		.then(response => {
    			//console.log('response :', response['status']);
            if(response['status'] == 'error'){
              this.invalidCredentialMsg = 'Merci de modifier le matricule ou le mot de passe, car il y a risque de doublon !';
            }else if(response['status'] == 'success'){
    			      this.router.navigate(['/user']);
            }else{
              this.invalidCredentialMsg = 'Merci de réessayer plus tard, car la base de données est indisponible !';
            }
    		});

    }

    goBack(): void{
    	this.router.navigate(['/user']);
      //this.location.back();
  	}


}
