import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { Client } from '../../service/client';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent {

	clientAddForm: FormGroup;
	client = new Client();
	typemail = {
		imap : 'imap',
		pop : 'pop'
	};
  	invalidCredentialMsg : String;
  
  	constructor(
  		private clientService: ClientService,
  		private router: Router,
  		private formBuilder: FormBuilder
  	) { 
  		this.buildForm();
  	}


  	buildForm(): void {
  		this.clientAddForm = this.formBuilder.group({
  			nameclient : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50) ]],
  			mailclient : ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
  			passmail : ['', [Validators.required, Validators.minLength(8)]],
  			typemail : ['', Validators.required],
  			hostmail : ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
        portmail : ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[0-9]*$/)]]
  		});
  	}

  	addmail(): void {
    	let client = this.clientAddForm.value as Client;
    	this.clientService.addMail(client)
    		.then(response => {
    			//console.log('response :', response['status']);
            if(response['status'] == 'error'){
              this.invalidCredentialMsg = 'Merci de modifier l\' adresse email du client ou le mot de passe du mail client, car il y a risque de doublon !';
            }else if(response['status'] == 'success'){
    			      this.router.navigate(['/client']);
            }else{
              this.invalidCredentialMsg = 'Merci de réessayer plus tard, car la base de données est indisponible !';
            }
    		});

    }

  	goBack(): void{
    	this.router.navigate(['/client']);
  	}

}
