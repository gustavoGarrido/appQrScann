import { Component } from '@angular/core';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public dataLocalService:DataLocalService) {}

  enviarCorreo(){

  }

  abrirRegistro(registro){
    this.dataLocalService.abrirRegistro(registro)
    console.log("abrirRegistro", registro)
  }

}
