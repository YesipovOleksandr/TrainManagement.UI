import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from './cookie.service';
import { AuthResponseModel } from '../models/AuthResponseModel';


@Injectable()
export class AuthService {
    private readonly AuthenticatedUserCookieKey = 'auth_user';

    constructor(private jwtHelper: JwtHelperService, private cookieService: CookieService) { }


    public setAuthData(resp: AuthResponseModel) {
        if (resp && resp.token) {
            var isSecure = location.protocol === 'https:';
            var response = new AuthResponseModel();
            response.updateData(resp);
            this.cookieService.remove(this.AuthenticatedUserCookieKey);
            this.cookieService.set(this.AuthenticatedUserCookieKey, JSON.stringify(response), 1, isSecure);
        }
    }


    public getAuthData(): AuthResponseModel {

        let authData: AuthResponseModel = new AuthResponseModel();

        try {
            authData.updateData(JSON.parse(this.cookieService.get(this.AuthenticatedUserCookieKey)) as AuthResponseModel);
        } catch (e) {
            return null!;
        }
        return authData;
    }

    public getToken(): string {

        let authData: AuthResponseModel = new AuthResponseModel();

        try {
            authData.updateData(JSON.parse(this.cookieService.get(this.AuthenticatedUserCookieKey)) as AuthResponseModel);
        } catch (e) {
            return null!;
        }
        return authData.token;
    }

    public isAuthorized(): boolean {
        var userToken = this.getAuthData();
        return userToken != null;
    }


    public clearAuthCookies() {
        this.cookieService.remove(this.AuthenticatedUserCookieKey);
    }
}