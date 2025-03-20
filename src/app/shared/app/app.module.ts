import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageModule } from 'src/app/main-page/main-page.module';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { LoginComponent } from '../../login/login.component';
import { AuthGuard } from 'src/app/guards/AuthGuard';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthService } from '../services/auth.service';
import { CookieService } from '../services/cookie.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateTimeService } from '../services/datetime.service';

export function tokenGetter() { 
  return localStorage.getItem("token"); 
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MainPageModule,
    BrowserAnimationsModule, 
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    AuthGuard,
    AuthService,
    CookieService,
    DateTimeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
