import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private barcodeScanner: BarcodeScanner, private dataLocalService: DataLocalService) {}

  slideOptions:{}={
    allowSlidePrev: false,
    allowSlideNext:false
  }

  ionViewWillEnter(){
    this.scan()
  }

  scan(){

    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if(!barcodeData){
        this.dataLocalService.guardarRegistro(barcodeData.format, barcodeData.text)
      }
     }).catch(err => {
        
     // this.dataLocalService.guardarRegistro("QRCode", "https://www.google.com/") // Linea utilzada solamente en ambiente de desarrollo
      this.dataLocalService.guardarRegistro("QRCode", "geo:40.73151796986687,-74.06087294062502")   
      console.log('Error', err);
     });
  }

}
