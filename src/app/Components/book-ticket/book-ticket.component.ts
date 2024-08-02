import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {

  constructor(private http: HttpClient,private router:Router, private activatedRoute: ActivatedRoute,private formBuilder: FormBuilder) { }
    movie:any;
    userid:any;
    movieid:any;
    ticketForm:any;

  ngOnInit(): void {

    this.ticketForm= this.formBuilder.group({
      id: [''],
      userId : [''],
      movieName: [''],
      theaterName : [''],
      noOfTickets : [0],
      seatNumber : ['']
      
    })
    this.userid=this.activatedRoute.snapshot.paramMap.get("id");
    

    this.movieid=this.activatedRoute.snapshot.paramMap.get("movieid");
    console.log(this.userid,this.movieid);
    var headers = new HttpHeaders().set("Content-Type","application/json");
    let params= new HttpParams().set("id",this.movieid);
    this.http.get<any>("https://localhost:44328/api/v1.0/moviebooking/GetMovieById",{headers:headers, params:params}).subscribe
    ({
      next:(res=>{
        this.movie= res;
        console.log(res);
      }),
      error:(err=>{
        console.log(err);
      })
    })
  }

  OnBook()
  {
    console.log(this.ticketForm.value);
    this.ticketForm.value.movieName= this.movie.key.movieName;
    this.ticketForm.value.theaterName= this.movie.key.theaterName;
    this.ticketForm.value.userId = this.userid;
    console.log(this.ticketForm.value);
    var headers = new HttpHeaders().set("Content-Type","application/json");
    let params= new HttpParams();
    this.http.post<any>("https://localhost:44328/api/v1.0/moviebooking/BookTicket",this.ticketForm.value,{headers:headers, params:params}).subscribe
    ({
      next:(res=>{
        console.log(res);
        alert("Booked");
        this.router.navigate(['home',this.userid]);
      }),
      error:(err=>{
        console.log(err);
        alert("Not Booked. "+ err.error);
        this.router.navigate(['home',this.userid]);
      })
    })

  }



  

  OnCancel()
  {
    this.router.navigate(['home',this.userid]);
  }

}
