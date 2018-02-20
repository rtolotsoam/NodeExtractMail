import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Lien } from '../../service/lien';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LienService } from "../../service/lien.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lien-update',
  templateUrl: './lien-update.component.html',
  styleUrls: ['./lien-update.component.css']
})
export class LienUpdateComponent implements OnInit {

	lienUpdateForm: FormGroup;
  	lien: Lien;
    invalidCredentialMsg : String;

  	constructor(
  		private route: ActivatedRoute,
      	private router: Router,
      	private formBuilder: FormBuilder,
        private lienService : LienService
  	) { }

  	ngOnInit() {
  		this.route.params
  			.switchMap((params: Params) => this.lienService.getLien(params['id_lien']))
  			.subscribe(lien => {
  				this.lien = lien['data'];
  				this.buildForm();
  		})
  	}

  	buildForm(): void {
  		this.lienUpdateForm = this.formBuilder.group({
  			titre : [this.lien.titre, [Validators.required, Validators.minLength(3), Validators.maxLength(50) ]],
  			path : [this.lien.path, [Validators.required, Validators.minLength(4), Validators.maxLength(50) ]],
  			icon : [this.lien.icon, [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
  			id_lien : [this.lien.id_lien]
  		});
  	}


  	updateLien(): void{
  		let lien = this.lienUpdateForm.value as Lien;
  		this.lienService.updateLien(lien)
  		.then(response => { 
            if(response['status'] == 'error'){
              	this.invalidCredentialMsg = 'Merci de réessayer plus tard, car la base de données est indisponible !';
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
