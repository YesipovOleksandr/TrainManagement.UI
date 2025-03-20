import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd,ActivatedRoute  } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  auth_token: string;
  unreadCount:number;
  isExistUnReadMessage:boolean=false;
  currentRoute: string | null;
  isOpenBurger:boolean=false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.auth_token = this.authService.getToken();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.route.snapshot.firstChild?.routeConfig?.path || null;
    });
  }


  logOut = () => {
    this.authService.clearAuthCookies();
    this.router.navigate(["login"]);
  }

  isUserAuthenticated():boolean{
    return this.authService.isAuthorized();
  } 

  openBurger(){
    this.isOpenBurger=!this.isOpenBurger;
    document.body.classList.toggle("body_lock");
    document.body.classList.toggle("active");
  }

}
