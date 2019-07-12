import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { RegisterComponent } from '../register/register.component';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private _modalController: ModalController,
    private _authService: AuthService,
    private _navCtrl: NavController,
    private _alertService: AlertService
  ) { }

  ngOnInit() {}

  // Dismiss Login Modal
  dismissLogin() {
    this._modalController.dismiss();
  }
  // On Register button tap, dismiss login modal and open register modal
  async registerModal() {
    this.dismissLogin();
    const registerModal = await this._modalController.create({
      component: RegisterComponent
    });
    return await registerModal.present();
  }
  // login(form: NgForm) {
  //   this._authService.login(form.value.email, form.value.password).subscribe(
  //     data => {
  //       this._alertService.successToast("Logged In");
  //     },
  //     error => {
  //       console.log(error);
  //     },
  //     () => {
  //       this.dismissLogin();
  //       this._navCtrl.navigateRoot('/dashboard');
  //     }
  //   );
  // }
}
