import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Client } from '../../service/client';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClientService } from "../../service/client.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClientUpdateComponent implements OnInit {

	clientUpdateForm: FormGroup;
  	client: Client;
  	typemail = {
  		imap : 'imap',
  		pop : 'pop'
  	};
    invalidCredentialMsg : String;

  	constructor(
  		private clientService: ClientService,
    	private router: Router,
    	private route: ActivatedRoute,
    	private formBuilder: FormBuilder
  		) { }

  	ngOnInit() {
  		this.route.params
  			.switchMap((params: Params) => this.clientService.getMail(params['id_mailclient']))
  			.subscribe(mail => {
  				this.client = mail['data'];
  				this.buildForm();
  			})
  	}


  	buildForm(): void {
  		this.clientUpdateForm = this.formBuilder.group({
  			nameclient : [this.client.nameclient, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
  			mailclient : [this.client.mailclient, [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
  			passmail : [this.client.passmail, [Validators.required, Validators.minLength(8)]],
  			typemail : [this.typemail],
  			hostmail : [this.client.hostmail, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
        portmail : [this.client.portmail, [Validators.required, Validators.minLength(2), Validators.pattern(/^[0-9]*$/)]],
  			id_mailclient : [this.client.id_mailclient]
  		});
  	} 

  	update(): void{
  		let client = this.clientUpdateForm.value as Client;
  		this.clientService.updateMail(client)
  		.then(response => { 
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
