import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-app-tabs',
  templateUrl: './app-tabs.page.html',
  styleUrls: ['./app-tabs.page.scss'],
})
export class AppTabsPage implements OnInit {

  constructor(
    private _authService: AuthService,
    private _navCtrl: NavController,
    private _alertService: AlertService
  ) { }

  ngOnInit() {
  }

  // When Logout Button is pressed 
  async logout() {
    try {
      let logoutResponse = await this._authService.logout();
      console.log(logoutResponse);
      this._alertService.successToast(logoutResponse.results);
      this._navCtrl.navigateRoot('/landing');
    } catch (error) {
      console.error(error);
      if(error.code == 13579){
        this._navCtrl.navigateRoot('/login');
      }
      this._alertService.errorToast(error);        
    }
  }
}
