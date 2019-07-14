import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  token:any;
  httpOptions = {};
  constructor(
    private _http: HttpClient,
    private _storage: NativeStorage,
    private _env: EnvService,
  ) {}

  register(name: String, email: String, password: String): Promise<any> {
    let body = {
      "name": name, "email": email, "password": password
    };

    return new Promise((resolve, reject) => {
      this._http.post<any>(this._env.API_URL + 'users/create', body, httpOptions).subscribe(response => {
        if (response.token.error != false) {
          reject(response.token);
          return;
        }
        resolve(response.token);
      });
    });
  }

  login(email: String, password: String): Promise<any> {
    let body = {
      "email": email, "password": password
    };

    return new Promise((resolve, reject) => {
      this._http.post<any>(this._env.API_URL + 'users/login', body, httpOptions).subscribe(response => {
        if(response.token.loginToken.error != false) {
          reject(response.token);
          return;
        }
        this._storage.setItem('token', response.token.loginToken.results).then(() => {
            console.log('Token Stored');
          },
          error => {
            localStorage.setItem('token', response.token.loginToken.results);
            console.error('Error storing item', error);}
        );
        
        this.token = response.token.loginToken.results;
        this.isLoggedIn = true;
        resolve(response.token);
      });
    }); 
  }
  
  logout() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this._http.get(this._env.API_URL + 'users/logout', { headers: headers })
    .pipe(
      tap(data => {
        this._storage.remove("token");
        this.isLoggedIn = false;
        delete this.token;
        return data;
      })
    )
  }
  user() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this._http.get<User>(this._env.API_URL + 'users/me', { headers: headers })
    .pipe(
      tap(user => {
        return user;
      })
    )
  }
  getToken() {
    return this._storage.getItem('token').then(
      data => {
        this.token = data;
        if(this.token != null) {
          this.isLoggedIn=true;
        } else {
          this.isLoggedIn=false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn=false;
      }
    );
  }
}
