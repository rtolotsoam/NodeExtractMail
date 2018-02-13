import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Client } from '../service/client';
import { ClientService } from '../service/client.service';
import { Router } from '@angular/router';

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

  	constructor(
  		private router : Router, 
  		private clientService : ClientService
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

}
