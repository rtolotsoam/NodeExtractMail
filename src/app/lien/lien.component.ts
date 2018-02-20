import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Lien } from '../service/lien';
import { LienService } from '../service/lien.service';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-lien',
  templateUrl: './lien.component.html',
  styleUrls: ['./lien.component.css'],
  providers : [LienService],
  encapsulation: ViewEncapsulation.None
})
export class LienComponent implements OnInit {

	  lien : Lien[];
  
  	loadingIndicator: boolean = true;
  	reorderable: boolean = true;

    invalidCredentialMsg : string;

  	constructor(
  		private router : Router, 
  		private lienService : LienService,
      public ngxSmartModalService : NgxSmartModalService
  	) { }

  	ngOnInit() {
  		this.getAllLien();
  	}

  	getAllLien(): void{
  		this.lienService.getAllLien()
  		.then(lien => {
            this.lien = lien['data'];
  		});
  	}

  	updateLien(id: string): void {
      this.router.navigate(['/updatelien', id]);
    }

    supprimer(id_lien: string, titre : string, path : string): void{

      var ln = {
        id_lien : id_lien,
        titre : titre,
        path : path
      }

      this.ngxSmartModalService.setModalData(ln, 'supprModal');
      this.ngxSmartModalService.getModal('supprModal').open();
    }

    supprimerLien(id_lien: string): void {
        this.lienService.deleteLien(parseInt(id_lien))
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
