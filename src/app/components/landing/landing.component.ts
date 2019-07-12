import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController, NavController } from '@ionic/angular';
import { RegisterComponent } from '../auth/register/register.component';
import { LoginComponent } from '../auth/login/login.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {

  constructor(
    private _modalController: ModalController,
    private _menu: MenuController,
    private _authService: AuthService,
    private _navCtrl: NavController
  ) { 
    this._menu.enable(false);
  }

  ionViewWillEnter() {
    this._authService.getToken().then(() => {
      if(this._authService.isLoggedIn) {
        this._navCtrl.navigateRoot('/dashboard');
      }
    });
  }

  ngOnInit() {}

  async register() {
    const registerModal = await this._modalController.create({
      component: RegisterComponent
    });
    return await registerModal.present();
  }
  async login() {
    const loginModal = await this._modalController.create({
      component: LoginComponent
    });
    return await loginModal.present();
  }

}
