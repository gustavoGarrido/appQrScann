import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File as ionFile } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados:Registro[]=[]

  constructor(private storage:Storage, private natCtrl:NavController, private iab:InAppBrowser , private file:ionFile, private emailComposer:EmailComposer) { 
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

  enviarCorreo(){

    const arregloTemp =[]
    const titulos = 'Tipo, Formato, Creado en, Texto\n';

    arregloTemp.push(titulos)

    this.guardados.forEach(registro => {
      const linea = `${ registro.type}, ${registro.format}, ${registro.created}, ${registro.texto.replace(',',' ')}\n`

      arregloTemp.push(linea)
    })
    
    console.log(arregloTemp.join(''))
    this.crearArchivoFisico(arregloTemp.join(''))

  }

  crearArchivoFisico(texto:string){

    this.file.checkFile(this.file.dataDirectory,'registros.csv')
      .then(exiteRegistro=>{
        console.log("existe registro?",exiteRegistro)
        return this.escribirEnArchivo(texto)
      })
      .catch(error=>{

        return this.file.createFile(this.file.dataDirectory,'registros.csv',false)
          .then(creado =>this.escribirEnArchivo(texto))
          .catch(error2=>console.log("error al crear el archivo",error2))
      })
  }

  async escribirEnArchivo(texto:string){
    await this.file.writeExistingFile(this.file.dataDirectory,'registros.csv',texto)
    const archivo = this.file.dataDirectory+'/registros.csv'
    console.log('archivo creado')

    const email = {
      to: 'ingindustrial.gustavo@gmail.com',
      cc: 'erika@mustermann.de',
      bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        archivo
      ],
      subject: 'Scaneo',
      body: 'Archivo con scaneos',
      isHtml: true
    }

    this.emailComposer.open(email);
  }



}
