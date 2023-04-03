import { Component, OnInit } from '@angular/core';
import { CuentasService } from '../servicios/recursos.service';
import { Cuenta } from '../interfaz/cuenta';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-vencidas',
  templateUrl: './vencidas.component.html',
  styleUrls: ['./vencidas.component.css']
})
export class VencidasComponent {
  cuentas: Cuenta[] = [];
  cuentasVencidas: Cuenta[] = [];
  constructor(private cuentasService: CuentasService) { }
  
  ngOnInit(): void {
    this.cuentasService.getCuentas().subscribe(respuesta => {
      this.cuentas = Object.values(respuesta);
      this.mostrarCuentas()
      this.cuentas=this.cuentasVencidas;
      
    });
    
  }

  

  mostrarCuentas() {
    
    for(let i = 0; i < this.cuentas.length; i++){
      if(this.cuentas[i].vencida){
        this.cuentasVencidas.push(this.cuentas[i]);
      }
    }
  }
    
    
    
}
