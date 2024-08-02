import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuardGuard } from 'src/app/AuthGuard/auth-guard.guard';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthGuardGuard]
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient,private router:Router,private activatedRoute: ActivatedRoute,private auth : AuthServiceService) { }

  movieList: any=[];
  userid:any;
  totalLength:any;
  page:number=1;
  ngOnInit(): void {

    console.log("movvvvee");
    this.userid=this.activatedRoute.snapshot.paramMap.get("id");
    
    var headers = new HttpHeaders().set("Content-Type","application/json");
    let params= new HttpParams();
    this.http.get<any[]>("https://localhost:44328/api/v1.0/moviebooking/GetAllMovies",{headers:headers, params:params}).subscribe
    ({
      next:(res=>{
        this.movieList= res;
        console.log(res);
      }),
      error:(err=>{
        console.log(err);
      })
    })

  }

  onBookTicket(id:any)
  {
    console.log(id);
    this.router.navigate(['book',this.userid,id])
  }

  OnLogout()
  {
    this.auth.LogOut();
  }

}
