import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service';
import { AuthService } from './auth.service';
import { BankAccount } from '../models/bank.account';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': this._auth.token
  });
  
  constructor(
    private _http: HttpClient,
    private _env: EnvService,
    private _auth: AuthService,
    private _navCtrl: NavController
  ) { }
}
