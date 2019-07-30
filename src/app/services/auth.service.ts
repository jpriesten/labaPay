import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HTTP } from '@ionic-native/http/ngx';
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

  public isLoggedIn = false;
  public token:any;
  public httpOptions = {};
  public tokenExpired = {};

  constructor(
    private _http: HttpClient,
    private _storage: NativeStorage,
    private _env: EnvService,
    private _nativeHTTP: HTTP
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
        if(response.token.error == true) {
          reject(response.token); 
          return;
        }
        if(response.token.loginToken.error == true) {
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
      }, errorResponse => {
        console.log(errorResponse);
        console.log(this._http.options); 
        reject(errorResponse);
        return;
      });
    }); 
  }
  
  logout(): Promise<any> {
    this._storage.getItem("token").then(token => {
      this.token = token;
      console.log("Retrieved token from native: ", token);
    }).catch(error => {
      console.log("Error fetching token from native: ", error);
      this.token = localStorage.getItem("token");
      console.log("Retrieved token from web: ", this.token);
    });

    let HTTPOptions = new HttpHeaders().set("Authorization", "Bearer " + this.token);
    return new Promise((resolve, reject) => {
      this._http.post<any>(this._env.API_URL + 'users/logout', {}, {headers: HTTPOptions}).subscribe(response => {
        if(response['error'] != false) {
          reject(response);
          return;
        }
        this.removeToken();
        resolve(response);
      }, errorResponse => {
        console.log("Errors: ", errorResponse);
        if(errorResponse.error.error != false) {
          this.tokenExpired = errorResponse.error;
          this.removeToken();
          reject(errorResponse.error);
          return;
        }
      });
    }); 
  }

  user(): Promise<any>  {
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    return new Promise((resolve, reject) => { 
      this._http.get<User>(this._env.API_URL + 'users/me', { headers: headers }).subscribe(response => {
        if(response['error'] != false) {
          reject(response);
          return;
        }
        resolve(response);
      }, errorResponse => {
        console.log("Errors: ", errorResponse);
        this.tokenExpired = errorResponse.error;
        reject(errorResponse.error);
        return;
      });
    });
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
        console.log(error);
        if(localStorage.getItem('token')) {
          this.token = localStorage.getItem('token');
          this.isLoggedIn = true;
        } else {
          this.token = null;
          this.isLoggedIn=false;
        }
        
      }
    );
  }

  removeToken() {
    this._storage.remove("token").then(() => {
      console.log("Token removed");

    }).catch(error => {
      localStorage.removeItem('token');
      console.error('Removing item', error);
    });
    this.isLoggedIn = false;
    delete this.token;
    delete this.tokenExpired;
  }
}
