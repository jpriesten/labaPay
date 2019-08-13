import { Component, OnInit } from '@angular/core';
import { ModalController, NavController} from '@ionic/angular';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  
  constructor(
    private _modalController: ModalController,
    private _authService: AuthService,
    private _navCtrl: NavController,
    private _alertService: AlertService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.loginFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this._alertService.processLoader('Please wait');
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Email address not valid.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' }
    ]
  }

  get logForm() { return this.loginFormGroup.controls; }
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

  async login(){ 
    try {
      this._alertService.loader.present();
      let loggedInUser = await this._authService.login(this.logForm.email.value, this.logForm.password.value);
      console.log("Logged: ", loggedInUser.user.results);
      this._alertService.loader.dismiss();
      this.dismissLogin();
      this._navCtrl.navigateRoot('/send');
    } catch (error) {
      console.error("Error: ", error);
      this._alertService.loader.dismiss();
      this._alertService.errorToast(error.results);
    }
  }
}
