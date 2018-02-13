// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

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
    ClientAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgxDatatableModule
  ],
  providers: [
    UserService,
    AuthService,
    AuthGuardService,
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
