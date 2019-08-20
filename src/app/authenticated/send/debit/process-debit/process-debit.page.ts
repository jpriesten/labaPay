import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-process-debit',
  templateUrl: './process-debit.page.html',
  styleUrls: ['./process-debit.page.scss'],
})
export class ProcessDebitPage implements OnInit {

  constructor(
    private _modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  dismissModal() {
    this._modalCtrl.dismiss(
      {'dismiss': true}
    );
  }

}
