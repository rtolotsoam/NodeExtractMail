import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from './../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

	  loginForm : FormGroup;
	  invalidCredentialMsg : String;

  	constructor(
  		private authService: AuthService,
  		private router: Router,
  		private formBuilder: FormBuilder
  	) {
  		this.buildForm();
  	}

    ngOnInit(){
      this.authService.logoutUser();
    }

  	buildForm(): void {
  		this.loginForm = this.formBuilder.group({
  			matricule : ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[0-9]*$/)]],
  			password : ['', [Validators.required, Validators.minLength(8)]]
  		});
  	}

    onFormSubmit() {
        let matricule = this.loginForm.get('matricule').value;
        let password = this.loginForm.get('password').value;

        this.authService.isUserAuthenticated(matricule, password)
        .then(
            authenticated => {
              
              if(authenticated) {
                let url = this.authService.getRedirectUrl();
                console.log('Redirect url : '+url);
                this.router.navigate([url]);
              }else{
                this.invalidCredentialMsg = 'Matricule ou mot de passe érroner !';
              }
            }
        );

        this.invalidCredentialMsg = 'Matricule ou mot de passe érroner !';
    }




}
