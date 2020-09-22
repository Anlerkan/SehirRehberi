import { Injectable } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { RegisterUser } from '../models/registerUser';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private alertifyService: AlertifyService) { }
  path = "http://localhost:44379/api/auth/";
  userToken: any;
  decodedToken: any;
  TOKEN_KEY = "token";
  jwtHelper: JwtHelper = new JwtHelper();
  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.http
      .post(this.path + "login", loginUser, { headers: headers })
      .subscribe(data => {
        this.saveToken(data);
        console.log(JSON.stringify(data));
        this.userToken = data;
        this.decodedToken = this.jwtHelper.decodeToken(data.toString());
        this.alertifyService.success("Başarıyla giriş yapıldı!");
        this.router.navigateByUrl('/city')
      });
  }
  register(registerUser: RegisterUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.http.post(this.path + 'register', registerUser, { headers: headers })
      .subscribe(data => {

      })
  }
  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  isLoggedIn() {
    return tokenNotExpired(this.TOKEN_KEY);
  }
  getCurrentUserId() {
    return this.jwtHelper.decodeToken(this.token).nameid;
  }
  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
