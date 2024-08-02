import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.css']
})
export class AccountViewComponent implements OnInit {

  constructor(private http: HttpClient,private activatedRoute: ActivatedRoute,private auth : AuthServiceService,private formBuilder: FormBuilder) { }

  cust: any;
  userid: any;
  flag:number=0;
  userForm:any;
  ngOnInit(): void {
    this.userid=this.activatedRoute.snapshot.paramMap.get("id");
    
    var headers = new HttpHeaders().set("Content-Type","application/json");
    let params= new HttpParams().set("loginid",this.userid);
    this.http.get<any>("https://localhost:44328/api/v1.0/moviebooking/GetCustomerById",{headers:headers, params:params}).subscribe
    ({
      next:(res=>{
        this.cust= res;
        console.log(res);
      }),
      error:(err=>{
        console.log(err);
      })
    })
  }

  OnModify()
  {
    this.flag=1;
    this.userForm= this.formBuilder.group({
      loginId: [this.cust.loginId,Validators.required],
      firstName: [this.cust.firstName,Validators.required],
      lastName : [this.cust.lastName],
      emailId : [this.cust.emailId],
      contactNumber : [this.cust.contactNumber]
    })
  }

  OnUpdate()
  {
    this.flag=0;
    console.log(this.userForm);
    var headers = new HttpHeaders().set("Content-Type","application/json");
    let params= new HttpParams();
    this.http.put<any>("https://localhost:44302/api/v1.0/moviebooking/UpdateCustomerDetails",this.userForm.value,{headers:headers, params:params}).subscribe
    ({
      next:(res=>{
        console.log(res);
        alert(" Successful");
        window.location.reload();
      }),
      error:(err=>{
        alert("Something went Wrong "+err);
        console.log(err);
      })
    })
  }

  OnCancel()
  {
    this.flag=0;
  }

  OnLogout()
  {
    this.auth.LogOut();
  }

}
