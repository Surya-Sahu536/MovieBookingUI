import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/Models/movie.model';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-movie-control',
  templateUrl: './movie-control.component.html',
  styleUrls: ['./movie-control.component.css']
})
export class MovieControlComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router,private auth : AuthServiceService) { }

  allmovieList: Movie[] =[];
  movieList: any=[];
  totalLength:any;
  page:number=1;
  searchText: string ='';
  ngOnInit(): void {
    var headers = new HttpHeaders().set("Content-Type","application/json");
    let params= new HttpParams();
    this.http.get<any[]>("https://localhost:44328/api/v1.0/moviebooking/GetAllMovies",{headers:headers, params:params}).subscribe
    ({
      next:(res=>{
        console.log(res);
        this.allmovieList= res.map(item => ({
          id: item.id,
          key: {
            movieName: item.key.movieName,
            theaterName: item.key.theaterName
          },
          noOfTicketsRemaining: item.noOfTicketsRemaining,
          noOfTicketsAlloted: item.noOfTicketsAlloted,
          ticketStatus: item.ticketStatus
        }));

        console.log("aaa");
        console.log(this.searchText);
        console.log(this.allmovieList);
        this.movieList=this.allmovieList;
        
        console.log(res);
      }),
      error:(err=>{
        console.log(err);
      })
    })
  }


  OnUpdate(item:any)
  {
      var movie=item;
      console.log(movie);
      var headers = new HttpHeaders().set("Content-Type","application/json");
    let params= new HttpParams().set("id",movie.id);
    console.log(movie.id);
    this.http.post<any>("https://localhost:44328/api/v1.0/moviebooking/UpdateTicketsRemainingStatus",movie.id,{headers:headers, params:params}).subscribe
    ({
      next:(res=>{
        console.log(res);
        //alert("Updated Successfully");
        window.location.reload();
        //this.router.navigate(['login']);
      }),
      error:(err=>{
        alert("Something Went Wrong");
        console.log(err);
      })
    })
    
  }
  OnDelete(item:any)
  {
    var movie=item;
    var headers = new HttpHeaders().set("Content-Type","application/json");
    let params= new HttpParams().set("id",movie.id);
  this.http.delete<any>("https://localhost:44328/api/v1.0/moviebooking/DeleteMovie",{headers:headers, params:params}).subscribe
  ({
    next:(res=>{
      console.log(res);
      //alert("Deleted Successfully");
      window.location.reload();
      //this.router.navigate(['moviecontrol']);
    }),
    error:(err=>{
      console.log(err);
      alert("Error : Something went Wrong");
    })
  })
  }


  Search()
  {
    if(this.searchText== ""){
      this.ngOnInit();
    }
    else
    {
      this.movieList = this.allmovieList.filter(res => {
        return res?.key?.movieName?.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase());
      })
    }
    
  }

  OnAdd()
  {
    this.router.navigate(['addmovie']);
  }

  OnLogout()
  {
    this.auth.LogOut();
  }

}
