import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../Services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private auth:AuthServiceService,private router: Router)
  {

  }
  canActivate(){
    if(this.auth.HaveAcess())
      return true;
    else
    {
      this.router.navigate(['login']);
      return false;
    }

  }
  
}
