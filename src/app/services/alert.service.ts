import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public loader: HTMLIonLoadingElement;

  constructor(
    private _toastController: ToastController,
    private _loadController: LoadingController
  ) { }

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

  async processLoader(message: any) {
    this.loader = await this._loadController.create({
      message: message
    });
  }
}
