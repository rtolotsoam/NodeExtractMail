import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Lien } from '../service/lien';
import { User } from '../service/user';
import { AccesService } from '../service/acces.service';

@Component({
  selector: 'app-includes',
  templateUrl: './includes.component.html',
  styleUrls: ['./includes.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class IncludesComponent implements OnInit {

	lien : Lien;
	user : User;

  	constructor(
  		private  accesService : AccesService
  	) { }

  	ngOnInit() {
  		this.getLienWithLevel();
  	}

  	getLienWithLevel(): void {
  		var currentUser = JSON.parse(localStorage.getItem('currentUser'));

  		if(currentUser != null){
  			this.user = currentUser.user;
  		}

  		this.accesService.getLienWithLevel(this.user.idlevel.toString())
      	.then(lien => { this.lien = lien['data'] });
  	}

}
