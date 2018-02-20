import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Level } from '../../service/level';
import { Lien } from '../../service/lien';
import { LevelService } from '../../service/level.service';
import { LienService } from '../../service/lien.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-level-add',
  templateUrl: './level-add.component.html',
  styleUrls: ['./level-add.component.css']
})
export class LevelAddComponent {

	  levelAddForm: FormGroup;
	  level = new Level();
    lien : Lien;
  	invalidCredentialMsg : String;

  	constructor(
  		private router: Router,
  		private formBuilder: FormBuilder,
      private levelService : LevelService,
      private lienService : LienService
  	) {
      this.getLien();
  		this.buildForm();
  	}


    getLien(): void {
      this.lienService.getAllLien()
        .then(lien => { this.lien = lien['data'] });
    }

  	buildForm(): void {
  		this.levelAddForm = this.formBuilder.group({
  			name : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50) ]],
        redirect : ['', [Validators.required]]
  		});
  	}

	  add(): void {
  		let level = this.levelAddForm.value as Level;
  		this.levelService.addLevel(level)
  			.then(response => {
  		        if(response['status'] == 'error'){
  		          this.invalidCredentialMsg = 'Merci de modifier le nom du level, car il y a risque de doublon !';
  		        }else if(response['status'] == 'success'){
  					      this.router.navigate(['/level']);
  		        }else{
  		          this.invalidCredentialMsg = 'Merci de réessayer plus tard, car la base de données est indisponible !';
  		        }
  			});

    }

  	goBack(): void{
    	this.router.navigate(['/level']);
  	}


}
