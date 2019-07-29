import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  public user: User;

  constructor(
    private _menu: MenuController,
    private _authService: AuthService
  ) { 
    this._menu.enable(true);
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    try {
      let response = await this._authService.user();
      this.user = response.results; 
    } catch (error) {
      console.log(error);
    }
  }

}
