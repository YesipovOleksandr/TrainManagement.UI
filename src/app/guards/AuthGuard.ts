import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../shared/services/auth.service';
import { CookieService } from '../shared/services/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  private readonly AuthenticatedUserCookieKey = 'auth_user';
  
  constructor(private router:Router, 
              private jwtHelper: JwtHelperService,
              private authService:AuthService,
              private cookieService: CookieService){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const auth_token = this.authService.getToken();
    if (auth_token && !this.jwtHelper.isTokenExpired(auth_token)){
      return true;
    }
    this.router.navigate(["login"]);
    this.cookieService.remove(this.AuthenticatedUserCookieKey);
    return false;
  }
}