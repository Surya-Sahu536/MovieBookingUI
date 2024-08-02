import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from 'src/app/Models/movie.model';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  movieForm: any;
  constructor(private formBuilder: FormBuilder, private router:Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.movieForm= this.formBuilder.group({
      id: [''],
      movieName: [''],
      theaterName : [''],
      noOfTicketsAllocated : [''],
      noOfTicketsRemaining : [''],
      ticketStatus : ['']
      
    })
  }

  OnAdd()
  {
    console.log(this.movieForm.value);
    const movieData= this.movieForm.value;
    const movie: Movie = {
      id: "0",
      key:{
      movieName : movieData.movieName,
      theaterName: movieData.theaterName
      },
      noOfTicketsAlloted: movieData.noOfTicketsAllocated,
      noOfTicketsRemaining: movieData.noOfTicketsRemaining,
      ticketStatus: movieData.ticketStatus
    };

    var headers = new HttpHeaders().set("Content-Type","application/json");
    let params= new HttpParams();
    this.http.post<any>("https://localhost:44328/api/v1.0/moviebooking/AddMovie",movie,{headers:headers, params:params}).subscribe
    ({
      next:(res=>{
        console.log(res);
        alert("Movie Added");
        //this.router.navigate(['login']);
      }),
      error:(err=>{
        console.log(err);
        alert("Some Error Occured");
      })
    })
    
  }

  OnCancel()
  {
    this.router.navigate(['moviecontrol']);
  }

}
