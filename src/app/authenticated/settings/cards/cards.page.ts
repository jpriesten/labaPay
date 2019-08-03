import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { BankAccount } from 'src/app/models/bank.account';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {

  public cards = [];

  constructor(
    private _card: CardService,
    private _alert: AlertService
  ) { }

  ngOnInit() { }

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

}
