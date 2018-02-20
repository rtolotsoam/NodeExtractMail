import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Level } from '../service/level';
import { LevelService } from '../service/level.service';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css'],
  providers : [LevelService],
  encapsulation: ViewEncapsulation.None
})
export class LevelComponent implements OnInit {

	level : Level[];

	loadingIndicator: boolean = true;
  reorderable: boolean = true;

  invalidCredentialMsg : string;

  	constructor(  		
  		private router : Router, 
  		private levelService : LevelService,
      public ngxSmartModalService : NgxSmartModalService
  	) { }

  	ngOnInit() {
  		this.getAllLevel();
  	}

  	getAllLevel(): void{
  		this.levelService.getAllLevel()
  		.then(level => {
            this.level = level['data'];
  		});
  	}

  	updateLevel(id: string): void {
      	this.router.navigate(['/updatelevel', id]);
    }


    supprimer(id_level: string, name : string): void{

      var lv = {
        id_level : id_level,
        name : name
      }

      this.ngxSmartModalService.setModalData(lv, 'supprModal');
      this.ngxSmartModalService.getModal('supprModal').open();
    }

    supprimerLevel(id_level: string): void {
        this.levelService.deleteLevel(parseInt(id_level))
        .then(response => {
              if(response['status'] == 'success'){
                this.ngxSmartModalService.getModal('supprModal').close();
                this.ngOnInit();
              }else{
                this.invalidCredentialMsg = 'Merci de réessayer plus tard, car la base de données est indisponible !';
              }
        });
    }

}
