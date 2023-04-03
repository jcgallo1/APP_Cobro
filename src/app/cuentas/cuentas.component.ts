import { Component, OnInit } from '@angular/core';
import { CuentasService } from '../servicios/recursos.service';
import { Cuenta } from '../interfaz/cuenta';
import { NgForm } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {
  cuentas: Cuenta[] = [];
  busqueda: string = '';
  fechas:string[]=[];
  pagos:string[]=[];
  tuplas:string[][]=[]
  constructor(private cuentasService: CuentasService) { }

  ngOnInit(): void {
    this.cuentasService.getCuentas().subscribe(respuesta => {
      this.cuentas = Object.values(respuesta);
      this.cuentas.sort((a, b) => a.id - b.id); 
    });
  }
  getCuentaRevisar(cuenta: Cuenta) {
    this.fechas = [];
    this.pagos = [];
  
    for (let i = 1; i < cuenta.nuevoAtributo.length; i++) {
      const fechaPago = cuenta.nuevoAtributo[i].split(",");
      this.fechas.push(fechaPago[0]);
      this.pagos.push(fechaPago[1]);
    }
  
    this.tuplas= this.fechas.map((fecha, i) => [fecha, this.pagos[i]]);
  
    // Ahora puedes utilizar la matriz de tuplas "tuplas" en lugar de "fechas" y "pagos"
  }
  getCuentasFiltradas(): Cuenta[] {
    return this.cuentas.filter(cuenta => cuenta.nombre.toString().toLowerCase().includes(this.busqueda.toLowerCase()));
  }
  addCuenta(addCuentaForm: NgForm): void {
    const checkbox = document.querySelector('#checkbox1') as HTMLInputElement;
    const cuenta: Cuenta = {
      semanal: "0",
      pago: addCuentaForm.value.pago,
      fecha: addCuentaForm.value.fecha,
      nombre: addCuentaForm.value.nombre,
      deuda: (addCuentaForm.value.valor),
      nuevoAtributo: ["0,0"],
      id: this.cuentas.length,
      saldo: parseFloat(addCuentaForm.value.valor) + (parseFloat(addCuentaForm.value.valor) * 20) / 100,
      vencida: false
    };
    if(checkbox.checked){
      const diasDeLaSemana = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
      ];
      cuenta.semanal= diasDeLaSemana[new Date(addCuentaForm.value.fecha).getDay()];
      
      
    }
    this.cuentasService.añadirCuenta(cuenta, "cuenta" + cuenta.id).subscribe(() => {
      console.log('Cuenta añadida');
      addCuentaForm.resetForm();
      this.cuentasService.getCuentas().subscribe(respuesta => {
        this.cuentas = Object.values(respuesta);
      });
    });
  }
  isCuentaVencida(cuenta: Cuenta): boolean {
    
    return cuenta.vencida;
  }
   toggleAddAccount() {
    const addAccountForm = document.querySelector('#add-account-form') as HTMLElement;
    const addAccountButton = document.querySelector('#add-account-button') as HTMLElement;
  
    addAccountForm.classList.toggle('show');
    addAccountButton.classList.toggle('active');
  }
}