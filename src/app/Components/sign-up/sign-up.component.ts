import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm : any;
  constructor(private formBuilder: FormBuilder, private router:Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.signupForm= this.formBuilder.group({
      loginId: ['',Validators.required],
      firstName: ['',Validators.required],
      lastName : [''],
      emailId : [''],
      password : ['',Validators.required],
      userRole : ['',Validators.required],
      contactNumber : ['']
    })
  }


  OnSignup()
  {
    if(this.signupForm.valid)
    {
      console.log("valid");
      console.log(this.signupForm.value);
    var headers = new HttpHeaders().set("Content-Type","application/json");
    let params= new HttpParams();
    this.http.post<any>("https://localhost:44302/api/v1.0/moviebooking/Register",this.signupForm.value,{headers:headers, params:params}).subscribe
    ({
      next:(res=>{
        console.log(res);
        alert("Signup Successful");
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
