// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';

// Components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { UserAddComponent } from './user/user-add/user-add.component';

// Service
import { UserService } from './service/user.service';
import { AuthService } from './service/auth.service';
import { AuthGuardService } from './service/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    UserDetailComponent,
    UserUpdateComponent,
    UserAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    UserService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
