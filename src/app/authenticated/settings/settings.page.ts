import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private _authService: AuthService,
    private _navCtrl: NavController,
    private _alertService: AlertService
  ) { }

  ngOnInit() {
    this._alertService.processLoader('Please wait');
  }

  // When Logout Button is pressed 
  async logout() {
    try {
      this._alertService.loader.present();
      let logoutResponse = await this._authService.logout();
      console.log("Value: ", logoutResponse);
      this._alertService.loader.dismiss();
      this._alertService.successToast(logoutResponse.results);
      this._navCtrl.navigateRoot('/landing');
    } catch (error) {
      console.error("Error: ", error);
      this._alertService.loader.dismiss();
      if(error.code == 13579){
        this._alertService.errorToast(`${error.results}: ${error.message}`);        
        this._navCtrl.navigateRoot('/landing');
        return;
      }
    }
  }
}
