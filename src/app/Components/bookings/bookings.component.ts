import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  ticketList: any=[];
  userid:any;
  totalLength:any;
  page:number=1;
  constructor(private http: HttpClient, private router:Router, private activatedRoute: ActivatedRoute,private auth : AuthServiceService) { }

  ngOnInit(): void {
    this.userid=this.activatedRoute.snapshot.paramMap.get("id");
    
    var headers = new HttpHeaders().set("Content-Type","application/json");
    let params= new HttpParams().set("id",this.userid);
    this.http.get<any[]>("https://localhost:44328/api/v1.0/moviebooking/GetTicketByUserId",{headers:headers, params:params}).subscribe
    ({
      next:(res=>{
        this.ticketList= res;
        console.log(res);
      }),
      error:(err=>{
        console.log(err);
      })
    })
  }

  OnLogout()
  {
    this.auth.LogOut();
  }

}


