import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public images: { name: string; dataUrl: string } [] = [];
  public counter = 1;

  constructor() {
    //
    const savedImages = localStorage.getItem('images');

    //
    if (savedImages) {
      //
      this.images = JSON.parse(savedImages);

      //
      const lastSequenceNumber = localStorage.getItem('lastSequenceNumber');

      //
      if (lastSequenceNumber) {
        //
        this.counter = parseInt(lastSequenceNumber) + 1;
      }
    }
    
  }

  async TakePic(){
    //
    const image = await Camera.getPhoto({resultType: CameraResultType.DataUrl,});

    //
    if (image.dataUrl){
      //
      const name = 'img_' + this.counter.toString().padStart(3, '0')+ '_' + new Date().toISOString().split('T')[0];

      //
      this.images.push({name, dataUrl: image.dataUrl});

      //
      localStorage.setItem('images', JSON.stringify(this.images));

      localStorage.setItem('lastSequenceNumber', this.counter.toString());

      //
      this.counter++;
    }
  }
}
