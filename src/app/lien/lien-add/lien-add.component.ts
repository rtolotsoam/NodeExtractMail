import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Lien } from '../../service/lien';
import { LienService } from '../../service/lien.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-lien-add',
  templateUrl: './lien-add.component.html',
  styleUrls: ['./lien-add.component.css']
})
export class LienAddComponent {

	lienAddForm: FormGroup;
	lien = new Lien();
  	invalidCredentialMsg : String;

  	constructor(
  		private router: Router,
  		private formBuilder: FormBuilder,
      	private lienService : LienService
  	) { 
  		this.buildForm();
  	}


  	buildForm(): void {
  		this.lienAddForm = this.formBuilder.group({
  			titre : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50) ]],
  			path : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50) ]],
  			icon : ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50) ]]
  		});
  	}

  	addLien(): void {
    	let lien = this.lienAddForm.value as Lien;
    	this.lienService.addLien(lien)
    		.then(response => {
	            if(response['status'] == 'error'){
	              this.invalidCredentialMsg = 'Merci de modifier le chemin d\'accès du lien, car il y a risque de doublon !';
	            }else if(response['status'] == 'success'){
	    			      this.router.navigate(['/lien']);
	            }else{
	              this.invalidCredentialMsg = 'Merci de réessayer plus tard, car la base de données est indisponible !';
	            }
    		});
    }

  	goBack(): void{
    	this.router.navigate(['/lien']);
  	}

}
