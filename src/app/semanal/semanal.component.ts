import { Component, OnInit } from '@angular/core';
import { CuentasService } from '../servicios/recursos.service';
import { Cuenta } from '../interfaz/cuenta';
import { NgFor } from '@angular/common';



@Component({
  selector: 'app-semanal',
  templateUrl: './semanal.component.html',
  styleUrls: ['./semanal.component.css']
})
export class SemanalComponent implements OnInit {
  cuentas: Cuenta[] = [];
  cuentasSemanales: Cuenta[] = [];
  constructor(private cuentasService: CuentasService) { }
  
  ngOnInit(): void {
    this.cuentasService.getCuentas().subscribe(respuesta => {
      this.cuentas = Object.values(respuesta);
      this.cuentas_getSemanales();
      this.cuentas=this.cuentasSemanales;
    });
    
  }

 cuentas_getSemanales(){
  for(let i=0; i < this.cuentas.length;i++){
    if(this.cuentas[i].semanal != "0"){
      this.cuentasSemanales.push(this.cuentas[i]);
    }
  } }
}
