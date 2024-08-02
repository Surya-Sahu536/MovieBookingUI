import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private _http : HttpClient,private router:Router) { }

  logIn(val:any):Observable<any>{
    var headers=new HttpHeaders();
  
     headers.append( "content-type","application/json");
     //headers.append({'id','firstname','lastname'},val);
    
     let params= new HttpParams().set("loginId",val.userName).set("password",val.password).set("userRole",val.userRole);
     //params.append("someParamKey", val)

    return this._http.get('https://localhost:44302/api/v1.0/moviebooking',{headers:headers, params:params,responseType:'text'}

    )
  }

  AdminlogIn(val:any):Observable<any>{
    var headers=new HttpHeaders();
  
     headers.append( "content-type","application/json");
     //headers.append({'id','firstname','lastname'},val);
    
     let params= new HttpParams().set("loginId",val.adminuserName).set("password",val.adminpassword).set("userRole",val.userRole);
     //params.append("someParamKey", val)

    return this._http.get('https://localhost:44302/api/v1.0/moviebooking',{headers:headers, params:params,responseType:'text'}

    )
  }


  IsLoggedIn()
  {
    console.log("gkvhvlh");
    return localStorage.getItem('token')!=null;
  }

  GetToken()
  {
    return localStorage.getItem('token')||'';
  }

  HaveAcess()
  {
    var token= localStorage.getItem('token')||'';
    var extractedtoken= token.split('.')[1];
    var atobdata= atob(extractedtoken);
    var parsed= JSON.parse(atobdata);
    const roleClaim= "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    if(parsed[roleClaim]=='Admin')
    {
      console.log("Userrole is Admin")
      return true;
    }
    console.log("User role is not admin");
    console.log(parsed);
    
    return false;
    
  }

  LogOut()
  {
    localStorage.clear();
    this.router.navigate(['login']);
  }


}
