import { Component, OnInit } from '@angular/core';
import { ClientService } from "../../service/client.service";
import { Client } from '../../service/client';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

	client : Client;

  	constructor(
  		private clientService: ClientService,
   		private route: ActivatedRoute,
      	private router: Router
  		) { }

  	ngOnInit() {
  		this.route.params
      	.switchMap((params: Params) => this.clientService.getMail(params['id_mailclient']))
      	.subscribe(mail => this.client = mail['data']);
  	}

  	goBack(): void{
	    this.router.navigate(['/client']);
	  }

}
