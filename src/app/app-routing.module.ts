import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// user
import { UserComponent}      from './user/user.component';
import { UserDetailComponent }  from './user/user-detail/user-detail.component';
import { UserUpdateComponent }  from './user/user-update/user-update.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { LoginComponent } from './login/login.component';

// client
import { ClientsComponent}      from './clients/clients.component';
import { ClientDetailComponent }  from './clients/client-detail/client-detail.component';
import { ClientUpdateComponent }  from './clients/client-update/client-update.component';
import { ClientAddComponent } from './clients/client-add/client-add.component';

// level
import { LevelComponent}      from './level/level.component';
import { LevelUpdateComponent }  from './level/level-update/level-update.component';
import { LevelAddComponent } from './level/level-add/level-add.component';

// lien
import { LienComponent }      from './lien/lien.component';
import { LienAddComponent } from './lien/lien-add/lien-add.component';
import { LienUpdateComponent }  from './lien/lien-update/lien-update.component';

// acces
import { AccesComponent }      from './acces/acces.component';
import { AccesAddComponent } from './acces/acces-add/acces-add.component';
import { AccesDetailComponent } from './acces/acces-detail/acces-detail.component';


import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {
  	path: 'detailuser/:id_user', 
  	component: UserDetailComponent,
  	canActivate : [ AuthGuardService ]
  },
  {
    path: 'detailmail/:id_mailclient', 
    component: ClientDetailComponent,
    canActivate : [ AuthGuardService ]
  },
  {
  	path: 'updateuser/:id_user', 
  	component: UserUpdateComponent,
  	canActivate : [ AuthGuardService ]
  },
  {
    path: 'updatemail/:id_mailclient', 
    component: ClientUpdateComponent,
    canActivate : [ AuthGuardService ]
  },
  {
    path: 'updatelevel/:id_level', 
    component: LevelUpdateComponent,
    canActivate : [ AuthGuardService ]
  },
  {
    path: 'updatelien/:id_lien', 
    component: LienUpdateComponent,
    canActivate : [ AuthGuardService ]
  },
  {
  	path: 'user',
   	component: UserComponent,
   	canActivate : [ AuthGuardService ]
  },
  {
    path: 'client',
    component: ClientsComponent,
    canActivate : [ AuthGuardService ]
  },
  {
    path: 'level',
    component: LevelComponent,
    canActivate : [ AuthGuardService ]
  },
  {
    path: 'lien',
    component: LienComponent,
    canActivate : [ AuthGuardService ]
  },
  {
    path: 'acces',
    component: AccesComponent,
    canActivate : [ AuthGuardService ]
  },
  {
  	path: 'adduser',
   	component: UserAddComponent,
   	canActivate : [ AuthGuardService ]
  },
  {
    path: 'addmailclient',
    component: ClientAddComponent,
    canActivate : [ AuthGuardService ]
  },
  {
    path: 'addlevel',
    component: LevelAddComponent,
    canActivate : [ AuthGuardService ]
  },
  {
    path: 'addlien',
    component: LienAddComponent,
    canActivate : [ AuthGuardService ]
  },
  {
    path: 'addacces/:id_level', 
    component: AccesAddComponent,
    canActivate : [ AuthGuardService ]
  },
  {
    path: 'accesdetail/:id_level', 
    component: AccesDetailComponent,
    canActivate : [ AuthGuardService ]
  },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}