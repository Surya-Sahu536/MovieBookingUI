import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { MovieControlComponent } from './Components/movie-control/movie-control.component';
import { AddMovieComponent } from './Components/add-movie/add-movie.component';
import { BookTicketComponent } from './Components/book-ticket/book-ticket.component';
import { MoviesViewComponent } from './Components/movies-view/movies-view.component';
import { AccountViewComponent } from './Components/account-view/account-view.component';
import { BookingsComponent } from './Components/bookings/bookings.component';
import { TokenInterceptorService } from './AuthGuard/token-interceptor.service';
import { AuthGuardGuard } from './AuthGuard/auth-guard.guard';
import { NgxPaginationModule } from 'ngx-pagination';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
//import { NgxSearchFilterModule } from 'ngx-search-filter';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignUpComponent,
    MovieControlComponent,
    AddMovieComponent,
    BookTicketComponent,
    MoviesViewComponent,
    AccountViewComponent,
    BookingsComponent,
    ForgotPasswordComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule, 
    //NgxSearchFilterModule
  ],
  providers: [AuthGuardGuard,{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
