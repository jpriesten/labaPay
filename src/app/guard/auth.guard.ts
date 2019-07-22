import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let currentUser_isLoggedIn = this._authService.isLoggedIn;
      let currentUser_token = localStorage.getItem('token');
      console.log(currentUser_isLoggedIn, ' => ', localStorage.getItem('token'));
      if (currentUser_token) currentUser_isLoggedIn = true;
      if (currentUser_isLoggedIn) {
          // authorised so return true
          return true;
      }
      // not logged in so redirect to login page with the return url
      this._router.navigate(['/landing']);
      return false;
  }
  
}
