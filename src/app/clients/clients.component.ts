import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Client } from '../service/client';
import { ClientService } from '../service/client.service';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  providers : [ ClientService ],
  encapsulation: ViewEncapsulation.None
})
export class ClientsComponent implements OnInit {

	  client : Client[];
	  loadingIndicator: boolean = true;
  	reorderable: boolean = true;

    invalidCredentialMsg : string;

  	constructor(
  		private router : Router, 
  		private clientService : ClientService,
      public ngxSmartModalService : NgxSmartModalService
  		) { }

  	getAllMail(): void{
  		this.clientService.getAllmail()
  		.then(mail => {
  			//console.log(users['data']);
            this.client = mail['data'];
  		});
  	}

  	ngOnInit() {
  		this.getAllMail();
  	}

    viewDetailMail(id: string): void {
      this.router.navigate(['/detailmail', id]);
    }

    update(id: string): void {
      this.router.navigate(['/updatemail', id]);
    }

    supprimer(id_mailclient: string, mailclient : string, nameclient : string): void{

      var cli = {
        id_mailclient : id_mailclient,
        mailclient : mailclient,
        nameclient : nameclient
      }

      this.ngxSmartModalService.setModalData(cli, 'supprModal');
      this.ngxSmartModalService.getModal('supprModal').open();
    }

    supprimerClient(id_mailclient: string): void {
        this.clientService.deleteClient(parseInt(id_mailclient))
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
