import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../service/user';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { NgxSmartModalService } from 'ngx-smart-modal';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [
    './user.component.css'
  ],
  providers : [UserService],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

	users : User[];
  
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  invalidCredentialMsg : string;

  	constructor(
  		private router : Router, 
  		private userService : UserService,
      public ngxSmartModalService : NgxSmartModalService
  	) { };

  	
  	getAllUsers(): void{
  		this.userService.getAllUsers()
  		.then(users => {
            this.users = users['data'];
  		});
  	}

  	ngOnInit() {
  		this.getAllUsers();
  	}

    update(id: string): void {
      this.router.navigate(['/updateuser', id]);
    }

  	viewDetail(id: string): void {
	    this.router.navigate(['/detailuser', id]);
	  }

    supprimer(id_user: string, matricule : string, prenom : string): void{

      var usr = {
        id_user : id_user,
        matricule : matricule,
        prenom : prenom
      }

      this.ngxSmartModalService.setModalData(usr, 'supprModal');
      this.ngxSmartModalService.getModal('supprModal').open();
    }

    supprimerUser(id_user: string): void {
      
        this.userService.deleteUser(parseInt(id_user))
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
