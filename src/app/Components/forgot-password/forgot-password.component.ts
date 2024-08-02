import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  signupForm : any;
  constructor(private formBuilder: FormBuilder, private router:Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.signupForm= this.formBuilder.group({
      loginId: ['',Validators.required],
      emailId : [''],
      password : ['',Validators.required],
      
    })
  }


  OnReset()
  {
    if(this.signupForm.valid)
    {
      console.log("valid");
      console.log(this.signupForm.value);
    var headers = new HttpHeaders().set("Content-Type","application/json");
    let params= new HttpParams().set("loginId",this.signupForm.value.loginId).set("emailId",this.signupForm.value.emailId).set("password",this.signupForm.value.password);
    this.http.put<any>("https://localhost:44302/api/v1.0/moviebooking/ResetPassword",{},{headers:headers, params:params}).subscribe
    ({
      next:(res=>{
        console.log(res);
        alert("Reset Successful");
        this.router.navigate(['login']);
      }),
      error:(err=>{
        alert("Something went Wrong "+err);
        console.log(err);
      })
    })

    }
    else{
      this.ValidateAllFields(this.signupForm);
    }
    
  }


  ValidateAllFields(formGroup: FormGroup)
  {
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      control?.markAsTouched({onlySelf:true});
    })
  }

  isFieldInvalid(field:string)
  {
    const control = this.signupForm.get(field);
    return control.touched && control.invalid;
  }


  OnLogin()
  {
    console.log(this.signupForm.value);
    this.router.navigate(['login']);
  }


}
