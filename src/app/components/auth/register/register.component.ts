import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { LoginComponent } from '../login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup;

  private token: String;
  public newUser: any;

  constructor(
    private _modalController: ModalController,
    private _authService: AuthService,
    private _navCtrl: NavController,
    private _alertService: AlertService,
    private _formBilder: FormBuilder
  ) { }

  ngOnInit() {

    this.registerFormGroup = this._formBilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: [''],
      country: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required]
    }, {validator: this.checkPasswords});

    this._alertService.processLoader('Please wait');

  }

  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.'}
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Email address not valid.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password should be at least 8 characters long.' }
    ],
    'country': [
      { type: 'required', message: 'Country is required.'}
    ],
    'city': [
      { type: 'required', message: 'City is required.'}
    ],
    'phone': [
      { type: 'required', message: 'Phone number is required.'}
    ],
    'address': [
      { type: 'required', message: 'Address is required.'}
    ],
    'gender': [
      { type: 'required', message: 'Gender is required.'}
    ]
  }

  get regForm() { return this.registerFormGroup.controls; }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }     
  }

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

  async register() {
    try {
      this._alertService.loader.present();
      let registeredUser = await this._authService.register(this.regForm.name.value, this.regForm.email.value, 
        this.regForm.password.value, this.regForm.country.value, this.regForm.phone.value, this.regForm.city.value, 
        this.regForm.address.value, this.regForm.gender.value);
      console.log(registeredUser);
      this._alertService.successToast("Account created successfully!");
      // Log user in
      let loggedInUser = await this._authService.login(this.regForm.email.value, this.regForm.password.value);
      console.log(loggedInUser);
      this._alertService.loader.dismiss();
      this.dismissRegister();
      this._navCtrl.navigateRoot('/send');
      
    } catch (error) {
      this._alertService.loader.dismiss();
      console.error(error);
      if(error.results.code && error.results.code == 11000){
        this._alertService.errorToast("Account already exist!");
      } else {
        console.error(error.results);
        this._alertService.errorToast(error.results);
      }
    }
  }
  
}
