import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './AuthGuard/auth-guard.guard';
import { RoleGuard } from './AuthGuard/role.guard';
import { AccountViewComponent } from './Components/account-view/account-view.component';
import { AddMovieComponent } from './Components/add-movie/add-movie.component';
import { BookTicketComponent } from './Components/book-ticket/book-ticket.component';
import { BookingsComponent } from './Components/bookings/bookings.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MovieControlComponent } from './Components/movie-control/movie-control.component';
import { MoviesViewComponent } from './Components/movies-view/movies-view.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'home/:id', component:HomeComponent,canActivate:[AuthGuardGuard]},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignUpComponent},
  {path: 'reset', component:ForgotPasswordComponent},
  {path: 'movies/:id', component:MoviesViewComponent},
  {path: 'account/:id', component:AccountViewComponent,canActivate:[AuthGuardGuard]},
  {path: 'bookings/:id', component:BookingsComponent,canActivate:[AuthGuardGuard]},
  {path: 'book/:id/:movieid', component:BookTicketComponent,canActivate:[AuthGuardGuard]},
  {path: 'moviecontrol', component:MovieControlComponent,canActivate:[AuthGuardGuard,RoleGuard]},
  {path: 'addmovie', component:AddMovieComponent,canActivate:[AuthGuardGuard,RoleGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
