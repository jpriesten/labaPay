import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { LoginComponent } from '../login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
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
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['']
    }, {validator: this.checkPasswords})
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
      let registeredUser = await this._authService.register(this.regForm.name.value, this.regForm.email.value, this.regForm.password.value);
      console.log(registeredUser);
      this._alertService.successToast("Account created successfully!");
      // Log user in
      
      
    } catch (error) {
      console.error(error);
      if(error.results.code == 11000){
        this._alertService.errorToast("Account already exist!");
      } else {
        this._alertService.errorToast(error.results.message);
      }
    }
  }
  // register() {
  //   this._authService.register(this.regForm.name.value, this.regForm.email.value, this.regForm.password.value).subscribe(
  //     data => {
  //       this._authService.login(this.regForm.email.value, this.regForm.password.value).subscribe(
  //         data => {
  //         },
  //         error => {
  //           console.log(error);
  //         },
  //         () => {
  //           this.dismissRegister();
  //           this._navCtrl.navigateRoot('/dashboard');
  //         }
  //       );
  //       this._alertService.presentToast(data['message']);
  //     },
  //     error => {
  //       console.log(error);
  //     },
  //     () => {
        
  //     }
  //   );
  // }
}
