import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { NgForm, NgModel } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginModel } from './models/LoginModel';
import { AuthService } from '../shared/services/auth.service';
import { AuthResponseModel } from '../shared/models/AuthResponseModel';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  credentials: LoginModel = { login: '', password: '' };
  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {

  }

  login = (form: NgForm) => {
    if (form.valid) {
      this.http.post<AuthResponseModel>(environment.apiUrl + "Account/authenticate", this.credentials, {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      })
        .subscribe({
          next: (response: AuthResponseModel) => {
            this.authService.setAuthData(response);
            this.invalidLogin = false;
            this.router.navigate(["/"]);
          },
          error: (err: HttpErrorResponse) => this.invalidLogin = true
        })
    }
  }
}