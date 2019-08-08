import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage implements OnInit {

  public card: any;
  public expiry: any;

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this._route.params.subscribe( params => {
      let temp = new Date(params.cardExpiryDate);
      this.expiry = `${temp.getMonth()}/${temp.getFullYear()}`;
      this.card = params;
      console.log("Card", this.card);
    });
  }

}
