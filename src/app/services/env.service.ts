import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  // https://labapay-server.herokuapp.com/  http://localhost:3000/
  API_URL = 'http://localhost:3000/';
  
  constructor() { }
}
