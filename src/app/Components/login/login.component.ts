import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:any;
  adminloginForm:any;
  id:any;
  constructor(private formBuilder: FormBuilder, private router:Router,private http: HttpClient, private auth : AuthServiceService) { }

  ngOnInit(): void {
    this.loginForm= this.formBuilder.group({
      userName: [''],
      password: [''],
      userRole: ['']
    });

    this.adminloginForm= this.formBuilder.group({
      adminuserName: [''],
      adminpassword: [''],
      userRole: ['Admin']
    })
  }

  OnLogin()
  {
    console.log(this.loginForm.value);
    this.auth.logIn(this.loginForm.value)
        .subscribe({
             next:(res=>{
              console.log(res)
              localStorage.setItem('token', res);
              this.id= this.loginForm.value.userName;
               //alert(res.message);
               //alert("login successful");
               //this.popup.showSuccess("Success", "login successful",4000)

               console.log(this.loginForm.value.userRole);
               if(this.loginForm.value.userRole=="User")
               {
                this.router.navigate(['movies',this.id]);
               }
               if(this.loginForm.value.userRole=="Admin")
               {
                  console.log("admin logged in");
                this.router.navigate(['moviecontrol']);
               }
               else
               {
                //this.loginForm.reset();
               
                //window.location.reload();
               }
               //this.loginForm.reset();
               
                //if(this.auth.HaveAcess())
                  //this.router.navigate(['admin'])
                //else
                  //this.router.navigate(['member']);
                 }),
                 error:(err)=>{
                 console.log(err);
                 alert("Unsuccessfull Attempt");
                 //this.popup.showError("Error", err.error)
                  }
              })




  }

  OnAdminLogin()
  {
    console.log(this.adminloginForm.value);
    this.auth.AdminlogIn(this.adminloginForm.value)
        .subscribe({
             next:(res=>{
              console.log(res)
              localStorage.setItem('token', res);
              this.id= this.adminloginForm.value.userName;
               alert("login successful");
               
               this.loginForm.reset();
               this.router.navigate(['moviecontrol']);
                
                 }),
                 error:(err)=>{
                 console.log(err);
                 
                  }
              })

  }



  OnSignup()
  {
    console.log(this.loginForm.value);
    this.router.navigate(['signup']);
  }

  OnReset()
  {
    console.log(this.loginForm.value);
    this.router.navigate(['reset']);
  }
}
