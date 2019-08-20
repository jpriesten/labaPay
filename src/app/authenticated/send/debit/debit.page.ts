import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ProcessDebitPage } from "./process-debit/process-debit.page";

@Component({
  selector: 'app-debit',
  templateUrl: './debit.page.html',
  styleUrls: ['./debit.page.scss'],
})
export class DebitPage implements OnInit {

  public debitModal: any; 
  
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async presentModal() {
    this.debitModal = await this.modalController.create({
    component: ProcessDebitPage,
    componentProps: { value: 123 }
    });
  
    await this.debitModal.present();
    const dismiss = await this.debitModal.onDidDismiss();
    console.log(dismiss);
  }
  
}
