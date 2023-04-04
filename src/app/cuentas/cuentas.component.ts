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
  fechas: string[] = [];
  pagos: string[] = [];
  tuplas: string[][] = []
  CuentasCambio: Cuenta[] = [];
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

    this.tuplas = this.fechas.map((fecha, i) => [fecha, this.pagos[i]]);

    // Ahora puedes utilizar la matriz de tuplas "tuplas" en lugar de "fechas" y "pagos"
  }
  getCuentasFiltradas(): Cuenta[] {
    return this.cuentas.filter(cuenta => cuenta.nombre.toString().toLowerCase().includes(this.busqueda.toLowerCase()));
  }
  cambiarPosicion(cuenta: Cuenta) {
    if (this.CuentasCambio.length < 2) {
      this.CuentasCambio = [...this.CuentasCambio, cuenta];
      console.log("cuenta 1 añadida")
    }
    if (this.CuentasCambio[0].id == this.CuentasCambio[1].id) {
      this.CuentasCambio = [];
      console.log("cuenta repetida")
    }
    if (this.CuentasCambio.length == 2 && this.CuentasCambio[0].id != this.CuentasCambio[1].id) {
      console.log("cuenta 2 añadida")
      const idTemp2 = this.CuentasCambio[1];
      const idTemp = this.CuentasCambio[0];
      const cuenta2: Cuenta = {
        semanal: idTemp2.semanal,
        pago: idTemp2.pago,
        fecha: idTemp2.fecha,
        nombre: idTemp2.nombre,
        deuda: idTemp2.deuda,
        nuevoAtributo: idTemp2.nuevoAtributo,
        id: idTemp.id,
        saldo: idTemp2.saldo,
        vencida: idTemp2.vencida
      };
      console.log(idTemp)
      console.log(idTemp2)
      console.log("---------------")
      const cuenta: Cuenta = {
        semanal: idTemp.semanal,
        pago: idTemp.pago,
        fecha: idTemp.fecha,
        nombre: idTemp.nombre,
        deuda: idTemp.deuda,
        nuevoAtributo: idTemp.nuevoAtributo,
        id: idTemp2.id,
        saldo: idTemp.saldo,
        vencida: idTemp.vencida
      };
      
      console.log( cuenta);
      console.log(cuenta2);
      console.log(this.CuentasCambio)
      this.CuentasCambio = [];
      console.log(this.CuentasCambio)
      this.cuentasService.añadirCuenta(cuenta, "cuenta" + cuenta.id).subscribe(() => {
        console.log('Cuenta añadida');
        this.cuentasService.getCuentas().subscribe(respuesta => {
          this.cuentas = Object.values(respuesta);
          this.cuentas.sort((a, b) => a.id - b.id);
        });
       
      });
      this.cuentasService.añadirCuenta(cuenta2, "cuenta" + cuenta2.id).subscribe(() => {
        console.log('Cuenta añadida');
        this.cuentasService.getCuentas().subscribe(respuesta => {
          this.cuentas = Object.values(respuesta);
          this.cuentas.sort((a, b) => a.id - b.id);
        });
      });
      
      
    }
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
      id: this.generarIdUnico(this.cuentas),
      saldo: parseFloat(addCuentaForm.value.valor) + (parseFloat(addCuentaForm.value.valor) * 20) / 100,
      vencida: false
    };

    if (checkbox.checked) {
      const diasDeLaSemana = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
      ];
      cuenta.semanal = diasDeLaSemana[new Date(addCuentaForm.value.fecha).getDay()];
      console.log(cuenta.semanal);

    }

    if (addCuentaForm.valid) {
      this.cuentasService.añadirCuenta(cuenta, "cuenta" + cuenta.id).subscribe(() => {
        console.log('Cuenta añadida');
        addCuentaForm.resetForm();
        this.cuentasService.getCuentas().subscribe(respuesta => {
          this.cuentas = Object.values(respuesta);
        });
      });
    } else {
      // marca todos los campos como tocados y no válidos para mostrar los mensajes de error
      Object.values(addCuentaForm.controls).forEach(control => {
        if (control.status == "INVALID") {
          control.markAsTouched();
          control.markAsDirty();
        }


      });
    }
  }
  isCuentaVencida(cuenta: Cuenta): boolean {

    return cuenta.vencida;
  }
  generarIdUnico(cuentas: Cuenta[]): number {
    let nuevoId = cuentas.length + 1; // Generar nuevo id
    let cuentaConIdExistente = cuentas.find((cuenta) => cuenta.id === nuevoId);

    while (cuentaConIdExistente) { // Si ya existe, incrementar id y buscar de nuevo
      nuevoId++;
      cuentaConIdExistente = cuentas.find((cuenta) => cuenta.id === nuevoId);
    }

    return nuevoId;
  }
  toggleAddAccount() {
    const addAccountForm = document.querySelector('#add-account-form') as HTMLElement;
    const addAccountButton = document.querySelector('#add-account-button') as HTMLElement;

    addAccountForm.classList.toggle('show');
    addAccountButton.classList.toggle('active');
  }
}