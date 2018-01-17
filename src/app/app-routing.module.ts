import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent}      from './user/user.component';
import { UserDetailComponent }  from './user/user-detail/user-detail.component';
import { UserUpdateComponent }  from './user/user-update/user-update.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { LoginComponent } from './login/login.component';

import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {
  	path: 'detailuser/:id_user', 
  	component: UserDetailComponent,
  	canActivate : [ AuthGuardService ]
  },
  {
  	path: 'updateuser/:id_user', 
  	component: UserUpdateComponent,
  	canActivate : [ AuthGuardService ]
  },
  {
  	path: 'user',
   	component: UserComponent,
   	canActivate : [ AuthGuardService ]
  },
  {
  	path: 'adduser',
   	component: UserAddComponent,
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