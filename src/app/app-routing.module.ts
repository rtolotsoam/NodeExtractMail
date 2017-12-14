import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserComponent}      from './user/user.component';
import {UserDetailComponent}  from './user/user-detail/user-detail.component';
import {UserUpdateComponent}  from './user/user-update/user-update.component';


const routes: Routes = [
  {path: '', redirectTo: '/user', pathMatch: 'full'},
  {path: 'detailuser/:id_user', component: UserDetailComponent},
  {path: 'updateuser/:id_user', component: UserUpdateComponent},
  {path: 'user', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}