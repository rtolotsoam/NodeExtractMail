// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable'; // datatable
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal'; // modal

// Components
import { AppComponent } from './app.component';

// Component user
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { UserAddComponent } from './user/user-add/user-add.component';

// Component include
import { IncludesComponent } from './includes/includes.component';

// Component client
import { ClientsComponent } from './clients/clients.component';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import { ClientUpdateComponent } from './clients/client-update/client-update.component';
import { ClientAddComponent } from './clients/client-add/client-add.component';

// Service
import { UserService } from './service/user.service';
import { AuthService } from './service/auth.service';
import { AuthGuardService } from './service/auth-guard.service';
import { ClientService } from './service/client.service';
import { LevelService } from './service/level.service';
import { LienService } from './service/lien.service';
import { AccesService } from './service/acces.service';

// Component level
import { LevelComponent } from './level/level.component';
import { LevelUpdateComponent } from './level/level-update/level-update.component';
import { LevelAddComponent } from './level/level-add/level-add.component';

// Component Lien
import { LienComponent } from './lien/lien.component';
import { LienAddComponent } from './lien/lien-add/lien-add.component';
import { LienUpdateComponent } from './lien/lien-update/lien-update.component';

// Component acces
import { AccesComponent } from './acces/acces.component';
import { AccesAddComponent } from './acces/acces-add/acces-add.component';
import { AccesDetailComponent } from './acces/acces-detail/acces-detail.component';




@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    UserDetailComponent,
    UserUpdateComponent,
    UserAddComponent,
    IncludesComponent,
    ClientsComponent,
    ClientDetailComponent,
    ClientUpdateComponent,
    ClientAddComponent,
    LevelComponent,
    LevelUpdateComponent,
    LevelAddComponent,
    LienComponent,
    LienAddComponent,
    LienUpdateComponent,
    AccesComponent,
    AccesAddComponent,
    AccesDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [
    UserService,
    AuthService,
    AuthGuardService,
    ClientService,
    LevelService,
    LienService,
    AccesService,
    NgxSmartModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
