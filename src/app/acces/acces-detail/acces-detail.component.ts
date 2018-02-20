import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Lien } from '../../service/lien';
import { Level } from '../../service/level';
import { User } from '../../service/user';
import { LienService } from "../../service/lien.service";
import { LevelService } from "../../service/level.service";
import { UserService } from "../../service/user.service";
import { AccesService } from "../../service/acces.service";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-acces-detail',
  templateUrl: './acces-detail.component.html',
  styleUrls: ['./acces-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccesDetailComponent implements OnInit {

	lien : Lien;
	level : Level;
	lienLevel : Level; 
	user : User;
	invalidCredentialMsg : String;
	accesDetailForm: FormGroup;

  	constructor(
  		private lienService: LienService,
  		private levelService : LevelService,
      	private router: Router,
      	private route: ActivatedRoute,
      	private formBuilder: FormBuilder,
        private accesService : AccesService,
        private userService : UserService
  	) { 
  	}

  	ngOnInit(): void {
  		this.getLien();
  		this.getLevel();
  		this.getLienWithLevel();
  		this.getUserWithLevel();
  		this.buildForm();
  	}

  	buildForm(): void {
  		this.accesDetailForm = this.formBuilder.group({
  			lien_id : ['']
  		});
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

  	getUserWithLevel(): void {
  		this.route.params
		.switchMap((params: Params) => this.accesService.getUserWithLevel(params['id_level']))
		.subscribe(user => {
			this.user = user['data'];
		})
  	}

  	detachLien(): void {
  		var level_id = this.level.id_level;
  		var count = this.accesDetailForm.value['lien_id'].length;


  		
  		for(var i=0; i < count; i++ ){
  			var lien_id = this.accesDetailForm.value['lien_id'][i];
  			

  			this.accesService.deleteAcces(level_id, lien_id)
	    	.then(response => {

	            if(response['status'] == 'success'){
	              	this.ngOnInit();
	            }else{
	              this.invalidCredentialMsg = 'Merci de réessayer plus tard, car la base de données est indisponible !';
	            }
	    	});

  		}
  	} 

  	goBack(): void {
    	this.router.navigate(['/acces']);
  	}

}
