import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _authService: AuthService,
    private _navCtrl: NavController,
    private _alertService: AlertService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // Commenting splashScreen Hide, so it won't hide splashScreen before auth check
      this.splashScreen.show();
      this._authService.getToken();
    });
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
