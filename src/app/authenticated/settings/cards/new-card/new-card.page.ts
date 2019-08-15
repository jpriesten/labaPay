import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CardService } from 'src/app/services/card.service';
import { BankAccount } from 'src/app/models/bank.account';
import { AlertService } from 'src/app/services/alert.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.page.html',
  styleUrls: ['./new-card.page.scss'],
})
export class NewCardPage implements OnInit {

  public newCardFormGroup: FormGroup;
  public bankCard: BankAccount;

  public createdCard: BankAccount;

  public startYear = new Date(Date.now()).getFullYear();
  public endYear = Number(this.startYear) + 12;

  constructor(
    private _card: CardService,
    private _alert: AlertService,
    private _formBuilder: FormBuilder,
    private _navCrtl: NavController
  ) { }

  ngOnInit() {

    this.newCardFormGroup = this._formBuilder.group({
      accountNumber: new FormControl('', Validators.compose([Validators.required, Validators.minLength(13),
        Validators.maxLength(16), Validators.pattern('^[4]([0-9]{15}$|[0-9]{12}$)')])),
      expiryDate: ['', [Validators.required]],
      securityCode: new FormControl('', Validators.compose([Validators.required, Validators.min(100)])),
      cardHolderName: ['', Validators.required]
    });

    this._alert.processLoader('Please wait');
  }

  validation_messages = {
    'cardNumber': [
      { type: 'required', message: 'Card number is required.' },
      { type: 'minlength', message: 'Card number must be at least 15 characters long.' },
      { type: 'maxlength', message: 'Card number cannot be more than 16 characters long.' },
      { type: 'pattern', message: 'Your card number must begin with 4 and contain only numbers.' },
    ],
    'cvv': [
      { type: 'required', message: 'Security code is required.' },
      { type: 'min', message: 'Invalid Security code.' }
    ],
    'cardHolderName': [
      { type: 'required', message: 'Name is required.' }
    ],
    'expires': [
      { type: 'required', message: 'Expiry date is required.' }
    ]
  }

  get cardForm() { return this.newCardFormGroup.controls; }

  async newCard() {
    this._alert.loader.present();
    try {
      let response = await this._card.newCard(this.cardForm.accountNumber.value, this.cardForm.expiryDate.value,
        this.cardForm.securityCode.value, this.cardForm.cardHolderName.value);
      this.createdCard = response['result'];
      this._alert.successToast(response['result']);
      console.log(response);
      this._alert.loader.dismiss();
      this._navCrtl.navigateRoot('/cards');
    } catch (error) {
      this._alert.loader.dismiss();
      this._alert.errorToast(error.result);
      console.error(error);     
    }
  }

}
