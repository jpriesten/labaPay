import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private _toastController: ToastController) { }
  async successToast(message: any) {
    const toast = await this._toastController.create({
      message: message,
      duration: 5000,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }

  async errorToast(message: any) {
    const toast = await this._toastController.create({
      message: message,
      duration: 5000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }
}
