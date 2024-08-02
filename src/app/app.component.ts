import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MovieBookingUI';
  showNavbar = true;

  constructor(private router: Router, private route: ActivatedRoute)
  {
    this.router.events.pipe(
      filter((event): event is NavigationEnd=> event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd)=>{
        this.showNavbar = !event.url.includes('/login');
      
    });
  }
}
