import { Component/*, OnInit*/, ViewEncapsulation } from '@angular/core';
import { Lien } from '../../service/lien';
import { Level } from '../../service/level';
import { Acces } from '../../service/acces';
import { LienService } from "../../service/lien.service";
import { LevelService } from "../../service/level.service";
import { AccesService } from "../../service/acces.service";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-acces-add',
  templateUrl: './acces-add.component.html',
  styleUrls: ['./acces-add.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccesAddComponent /*implements OnInit */{

	accesAddForm: FormGroup;
  	lien: Lien;
    level: Level;
    lienLevel : Level;
    acces = new Acces();
    invalidCredentialMsg : String;


  	constructor(
  		private lienService: LienService,
  		private levelService : LevelService,
      	private router: Router,
      	private route: ActivatedRoute,
      	private formBuilder: FormBuilder,
        private accesService : AccesService
  	) { 
  		this.getLienWithLevel();
  		this.getLevel();
  		this.getLien();
  		this.buildForm();
  	}

  	/*ngOnInit() {
  		this.route.params
  			.switchMap((params: Params) => this.levelService.getLevel(params['id_level']))
  			.subscribe(level => {
  				this.level = level['data'];
  			})
  	}*/

  	buildForm(): void {
  		this.accesAddForm = this.formBuilder.group({
  			lien_id : ['', [Validators.required]]
  		});
  	}

  	goBack(): void {
    	this.router.navigate(['/acces']);
  	}


  	getLien(): void {
  		this.lienService.getAllLien()
      	.then(lien => { this.lien = lien['data'] });
  	}

  	getLevel(): void {
  		this.route.params
		.switchMap((params: Params) => this.levelService.getLevel(params['id_level']))
		.subscribe(level => {
			this.level = level['data'];
		})
  	}

  	getLienWithLevel(): void {
  		this.route.params
		.switchMap((params: Params) => this.accesService.getLienWithLevel(params['id_level']))
		.subscribe(lienLevel => {
			this.lienLevel = lienLevel['data'];
		})
  	}

  	addacces(): void {
  		//console.log("level = "+this.level.id_level);
  		//console.log("count = "+this.accesAddForm.value['lien_id'].length);
  		var level_id = this.level.id_level;
  		var count = this.accesAddForm.value['lien_id'].length;

  		
	  		for(var i=0; i < count; i++ ){
	  			var lien_id = this.accesAddForm.value['lien_id'][i];
	  			var acc = {
	  				lien_id : lien_id,
	  				level_id : level_id 
	  			}

	  			let acces = acc as Acces;

	  			//console.log("acces = "+JSON.stringify(acces));

	  			this.accesService.addAcces(acces)
		    	.then(response => {
		            if(response['status'] == 'error'){
		              this.invalidCredentialMsg = 'Merci de sélectionner un autre lien, car il y a risque de doublon !';
		            }else if(response['status'] == 'success'){
	            	  	this.getLienWithLevel();
						this.getLevel();
						this.getLien();
						this.buildForm();
		            	 
		            }else{
		              this.invalidCredentialMsg = 'Merci de réessayer plus tard, car la base de données est indisponible !';
		            }
		    	});

	  		}

    }

}
