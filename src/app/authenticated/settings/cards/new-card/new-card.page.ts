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
      accountNumber: ['', [Validators.required, Validators.maxLength(13)]],
      expiryDate: ['', [Validators.required]],
      securityCode: ['', [Validators.required, Validators.minLength(3)]],
      cardHolderName: ['', Validators.required]
    });

    this._alert.processLoader('Please wait');
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
