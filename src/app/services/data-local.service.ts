import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados:Registro[]=[]

  constructor(private storage:Storage, private natCtrl:NavController, private iab:InAppBrowser) { 
    this.cargarScans()
  }

  async guardarRegistro(format:string, texto:string){

    await this.cargarScans() //Si bien ya está especificado en el constructor se utiliza para asegurarnos que antes de guardar cualquier registros primero vamos a cargar lo que ya esté guardalo en localstorage
    const nuevoRegistro = new Registro(format, texto);
    this.guardados.unshift(nuevoRegistro);
    this.storage.set("registros",this.guardados)
    this.abrirRegistro(nuevoRegistro)
    console.log("guardados", this.guardados)
  }

  async cargarScans(){
    let registrosStorage = await this.storage.get("registros")
    this.guardados = registrosStorage || []
  }

  abrirRegistro(registro:Registro){
    this.natCtrl.navigateForward('tabs/tab2')

    switch (registro.type) {
      case 'pagina web':
        this.iab.create(registro.texto,'_system');
      case 'geo':
        this.natCtrl.navigateForward(`tabs/tab2/mapa/${registro.texto}`)
        break;
    
      default:
        break;
    }
  }



}
