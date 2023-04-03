import { Component,OnInit } from '@angular/core';
import { Cuenta } from '../interfaz/cuenta';
import { CuentasService } from '../servicios/recursos.service';

import { Chart } from 'chart.js';
@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: ['./analisis.component.css'],
  template: '<canvas id="bar-chart"></canvas>'
})
export class AnalisisComponent implements OnInit {
  vencidas: number = 0;
  Ncuentas:number=0;
  Nsemanales: number=0;
  cobro: number=0;
  saldo: number=0;
  cuentas: Cuenta[] = [];
  cuentasSemanales: Cuenta[] = [];
  cuentasVencidas: Cuenta[] = [];
  
  constructor(private cuentasService: CuentasService) { }
  
  ngOnInit(): void {
    
    this.cuentasService.getCuentas().subscribe(respuesta => {
      this.cuentas = Object.values(respuesta);
      this.cuentas_getSemanales();
      this.cuentas_vencidas();
    });
    
  }
  cuentas_vencidas(){
    const fecha=new Date().toString().split(" ");
    const fechas=new Date().getMonth();
    for(let i=0; i<this.cuentas.length; i++){
      if(this.cuentas[i].vencida ){
        const fecha2=new Date(this.cuentas[i].fecha+"T00:00:00-05:00").toString().split(" ");
        const fechas2=new Date(this.cuentas[i].fecha+"T00:00:00-05:00").getMonth();
        
        if((fechas-1)==fechas2 &&fecha[2]==fecha2[2]){
          this.cuentasVencidas.push(this.cuentas[i]);
        }

        
      }
    }
    
    
    


  }
 cuentas_getSemanales(){
  const hoy= new Date();
  const diasDeLaSemana = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ];
    this.Ncuentas=this.cuentas.length
  for(let i=0; i < this.cuentas.length;i++){
    this.saldo+=((parseInt(this.cuentas[i].deuda) + (parseInt(this.cuentas[i].deuda)*20 /100))-(this.cuentas[i].saldo));
    this.cobro+=parseInt(this.cuentas[i].deuda)
    
    if(this.cuentas[i].vencida){
      this.vencidas++;
    }
    if(this.cuentas[i].semanal==diasDeLaSemana[hoy.getDay()]){
      
      this.cuentasSemanales.push(this.cuentas[i]);
    }
    if(this.cuentas[i].semanal != "0"){
      this.Nsemanales++;
    }
    
  } }

}
