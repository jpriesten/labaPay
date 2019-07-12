import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { LoginComponent } from '../login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(
    private _modalController: ModalController,
    private _authService: AuthService,
    private _navCtrl: NavController,
    private _alertService: AlertService

  ) { }

  ngOnInit() {}

  // Dismiss Register Modal
  dismissRegister() { 
    this._modalController.dismiss();
  }
  // On Login button tap, dismiss Register modal and open login Modal
  async loginModal() {
    this.dismissRegister();
    const loginModal = await this._modalController.create({
      component: LoginComponent
    });
    return await loginModal.present();
  }
  register(form: NgForm) {
    this._authService.register(form.value.fName, form.value.lName, form.value.email, form.value.password).subscribe(
      data => {
        this._authService.login(form.value.email, form.value.password).subscribe(
          data => {
          },
          error => {
            console.log(error);
          },
          () => {
            this.dismissRegister();
            this._navCtrl.navigateRoot('/dashboard');
          }
        );
        this._alertService.presentToast(data['message']);
      },
      error => {
        console.log(error);
      },
      () => {
        
      }
    );
  }
}
