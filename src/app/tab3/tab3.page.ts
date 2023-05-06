import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private toastController: ToastController) {}

  async openToast(position: 'top'){
    const toast = await this.toastController.create({
      message: 'Hello World!',
      duration: 1500,
      position: position,
    });
    await toast.present();
  }

}
