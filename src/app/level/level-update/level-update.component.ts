import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Level } from '../../service/level';
import { Lien } from '../../service/lien';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LevelService } from "../../service/level.service";
import { LienService } from "../../service/lien.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-level-update',
  templateUrl: './level-update.component.html',
  styleUrls: ['./level-update.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LevelUpdateComponent implements OnInit {

	  levelUpdateForm: FormGroup;
    level: Level;
    lien : Lien;
    invalidCredentialMsg : String;

  	constructor(
      	private router: Router,
      	private route: ActivatedRoute,
      	private formBuilder: FormBuilder,
        private levelService : LevelService,
        private lienService : LienService
  		) { }

  	ngOnInit() : void {
  		this.route.params
  			.switchMap((params: Params) => this.levelService.getLevel(params['id_level']))
  			.subscribe(level => {
  				this.level = level['data'];
          this.getLien();
  				this.buildForm();
  			})
  	}

  	buildForm(): void {
  		this.levelUpdateForm = this.formBuilder.group({
  			name : [this.level.name, [Validators.required, Validators.minLength(2), Validators.maxLength(50) ]],
  			redirect : [this.level.redirect, [Validators.required]],
        id_level : [this.level.id_level]
  		});
  	}

  	update(): void{
  		let level = this.levelUpdateForm.value as Level;
  		this.levelService.updateLevel(level)
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

    getLien(): void {
      this.lienService.getAllLien()
        .then(lien => { this.lien = lien['data'] });
    }

  	goBack(): void{
	    this.router.navigate(['/level']);
	}

}
