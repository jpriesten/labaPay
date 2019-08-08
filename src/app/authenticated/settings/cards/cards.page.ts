import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CardService } from 'src/app/services/card.service';
import { BankAccount } from 'src/app/models/bank.account';
import { AlertService } from 'src/app/services/alert.service';

import { CardDetailPage } from 'src/app/authenticated/settings/cards/card-detail/card-detail.page';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {

  public cards = [];

  constructor(
    private _card: CardService,
    private _alert: AlertService,
    private _router: Router
  ) { }

  ngOnInit() { 

    this._alert.processLoader("Please wait");

  }

  async ionViewWillEnter() {
    try {
      let response = await this._card.getCards();
      this.cards = response;
      console.log(this.cards);
    } catch (error) {
      this._alert.errorToast(error.result);
      console.error(error); 
    }
  }

  goToCardDetail(card: any) {
    this._router.navigate(['/cards/detail', card]);
  }

  async deleteCard(cardNumber: any) {

    const alert = await this._alert._alertController.create({
      header: 'Are you sure you want to delete?',
      message: 'Please type your card number to confirm',
      inputs: [
        {
          name: 'cardNumber',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, 
        {
          text: 'Confirm',
          handler: async (data) => {
            this._alert.loader.present();
            if(cardNumber == data.cardNumber) {
              console.log('Confirmed Okay', data);
              try {
                let deleted = await this._card.deleteCard(cardNumber);
                console.log(deleted);
                this._alert.loader.dismiss();
                this.ionViewWillEnter();
              } catch (error) {
                console.log("Big: ", error);
                this._alert.loader.dismiss();
              }
            } else {
              this._alert.errorToast("Wrong Card Number");
              this._alert.loader.dismiss();
            }
          }
        }
      ]
    });

    alert.present();
    console.log('Account Number: ', cardNumber);

  }

}
