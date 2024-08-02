import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/Models/movie.model';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-movies-view',
  templateUrl: './movies-view.component.html',
  styleUrls: ['./movies-view.component.css']
})
export class MoviesViewComponent implements OnInit {

  allmovieList: Movie[] =[];
  movieList: any=[];
  userid:any;
  totalLength:any;
  page:number=1;
  //searchText:any ={key:'', noOfTicketsRemaining:null, ticketStatus:''};
  searchText: string ='';
  constructor(private http: HttpClient, private router:Router,private activatedRoute: ActivatedRoute,private auth : AuthServiceService) { }

  ngOnInit(): void {
    this.userid=this.activatedRoute.snapshot.paramMap.get("id");
    
    var headers = new HttpHeaders().set("Content-Type","application/json");
    let params= new HttpParams();
    this.http.get<any[]>("https://localhost:44328/api/v1.0/moviebooking/GetAllMovies",{headers:headers, params:params}).subscribe
    ({
      next:((res : any[])=>{
        
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

  onBookTicket(id:any)
  {
    console.log(id);
    this.router.navigate(['book',this.userid,id])
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

  OnLogout()
  {
    this.auth.LogOut();
  }


  /*getfilteredMovies(): Movie[]
  {
    return this.allmovieList.filter(item => 
      item.key?.movieName?.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase())
      );
  }*/


}
