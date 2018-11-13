import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastrServiceProvider {

  constructor(private toastCtrl: ToastController) {}

  show (msg, duration){
      const toast = this.toastCtrl.create({
          message: msg, 
          duration: duration
      });
        return toast;
  }

}
