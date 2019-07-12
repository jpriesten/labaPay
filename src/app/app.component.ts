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
  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

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
      // this.splashScreen.hide();
      this._authService.getToken();
    });
  }

  // When Logout Button is pressed 
  logout() {
    this._authService.logout().subscribe(
      data => {
        this._alertService.presentToast(data['message']);        
      },
      error => {
        console.log(error);
      },
      () => {
        this._navCtrl.navigateRoot('/landing');
      }
    );
  }
}
