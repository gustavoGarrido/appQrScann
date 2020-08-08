import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var mapboxgl:any

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, AfterViewInit {

  constructor(private route: ActivatedRoute) { }

  lat:number
  lng:number

  ngOnInit() {
    let geo:any = this.route.snapshot.paramMap.get('geo');
    geo = geo.substr(4);
    geo = geo.split(',');

    this.lat = Number(geo[0]);
    this.lng = Number(geo[1]);
    console.log(this.lat, this.lng);

  }

  // prueba(){

  //   mapboxgl.accessToken = 'pk.eyJ1IjoiZ2dhcnJpZG8iLCJhIjoiY2tkbHRhZWcyMHF0ZTJ4cGYxcTYycmRlbCJ9.2L4wdG2KO2JADKCKt_vYiA';
  //   var map = new mapboxgl.Map({
  //     container: 'map',
  //     style: 'mapbox://styles/mapbox/streets-v11'
  //   });
  // }

  ngAfterViewInit(){
   
  }

}
