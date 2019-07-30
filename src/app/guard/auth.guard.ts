import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { AlertService } from "../services/alert.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _alertService: AlertService
  ) {
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM2MzhjYzhhOGEzYzY4NzFmMmMzMjgiLCJpYXQiOjE1NjQ0Mjc0MDAsImV4cCI6MTU2NDUxMzgwMH0.pEWSqKWhe-c5gH8eufUXz93qgE4_do9tQjkWzFk4qCk
    // localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM2MzhjYzhhOGEzYzY4NzFmMmMzMjgiLCJpYXQiOjE1NjQzNDM1NzYsImV4cCI6MTU2NDQyOTk3Nn0.rC52a0d44g9JPfoRb1FF0iTANdQO_YGQZi3aVpmTWE8');
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this._authService.tokenExpired && this._authService.tokenExpired['error'] == true) {
      let expired = this._authService.tokenExpired;
      console.log("Expired", this._authService.tokenExpired);
      this._alertService.errorToast(`${expired['results']}: ${expired['message']}`);
      this._authService.removeToken();
      return false;
    }

    if (this._authService.isLoggedIn) {
        // authorised so return true
        return true;
    }
    // not logged in so redirect to login page with the return url
    this._router.navigate(['/landing']);
    return false;
  
  }
  
}
