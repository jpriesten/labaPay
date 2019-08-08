import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service';
import { AuthService } from './auth.service';
import { BankAccount } from '../models/bank.account';

import * as Crypto from 'simple-crypto-js'
const crypto = new Crypto.default('out-of-the-box');

@Injectable({
  providedIn: 'root'
})
export class CardService {
  
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

  newCard(accountNumber: String, expiryDate: String, securityCode: String, cardHolderName: String): Promise<BankAccount>  {
    
    let body = {
      'accountNumber': accountNumber, 'cardExpiryDate': expiryDate, 'CVV': securityCode, 'cardHolderName': cardHolderName
    }

    return new Promise((resolve, reject) => { 
      this._http.post<BankAccount>(this._env.API_URL + 'cards/new', body, { headers: this.headers }).subscribe(response => {
        if(response['error'] != false) {
          reject(response);
          console.log(response);
          return;
        }
        resolve(response);
      }, errorResponse => {
        console.log("Errors: ", errorResponse);
        if(errorResponse.error.code && errorResponse.error.code == 13579) {
          this._auth.removeToken();
          this._navCtrl.navigateRoot('/landing');
          return;
        }
        reject(errorResponse.error);
        return;
      });
    });
  }

  getCards(): Promise<any>  {

    return new Promise((resolve, reject) => { 
      this._http.get<any>(this._env.API_URL + 'cards', { headers: this.headers }).subscribe(response => {
        if(response['error'] != false) {
          reject(response);
          console.log(response);
          return;
        }

        let decrypted = [];
        response['result'].forEach(card => {
          decrypted.push(this.decryptResult(card));
        });
        resolve(decrypted);

      }, errorResponse => {
        console.log("Errors: ", errorResponse);
        if(errorResponse.error.code && errorResponse.error.code == 13579) {
          this._auth.removeToken();
          this._navCtrl.navigateRoot('/landing');
          return;
        }
        reject(errorResponse.error);
        return;
      });
    });
  }

  deleteCard(cardNumber: any): Promise<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this._auth.token
      }),
      body: {
        'cardNumber': cardNumber
      }
    };

    return new Promise((resolve, reject) => {
      this._http.delete<any>(this._env.API_URL + 'card', options).subscribe(response => {
        if(response['error'] != false) {
          reject(response);
          console.log(response);
          return;
        }
        resolve(response);
      }, errorResponse => {
        console.log("Errors: ", errorResponse);
        if(errorResponse.error.code && errorResponse.error.code == 13579) {
          this._auth.removeToken();
          this._navCtrl.navigateRoot('/landing');
          return;
        }
        reject(errorResponse.error);
        return;
      });
    });
  }
 
  decryptResult(result: any): any {
    let decrypted:any;
    if(result) {
      decrypted = {
        accountNumber: Number(crypto.decrypt(result.accountNumber)),
        cardHolderName: String(crypto.decrypt(result.cardHolderName)),
        cardExpiryDate: String(crypto.decrypt(result.cardExpiryDate)),
        CVV: Number(crypto.decrypt(result.CVV))
      }
    }
    return decrypted;
  }
}
