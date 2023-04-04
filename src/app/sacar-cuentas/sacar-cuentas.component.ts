import { Component } from '@angular/core';
import { CuentasService } from '../servicios/recursos.service';
import { Cuenta } from '../interfaz/cuenta';

@Component({
  selector: 'app-sacar-cuentas',
  templateUrl: './sacar-cuentas.component.html',
  styleUrls: ['./sacar-cuentas.component.css']
})
export class SacarCuentasComponent {
  cuenta: Cuenta[]=[];
  busqueda: string = '';
  saldoAReducir=0// variable para guardar el id de la cuenta
  
  constructor(private cuentasService: CuentasService) { }

  ngOnInit(): void {
    this.cuentasService.getCuentas().subscribe(respuesta => {
      this.cuenta = Object.values(respuesta);
      this.cuenta.sort((a, b) => a.id - b.id); 
    });
  }

  getCuentasFiltradas(): Cuenta[] {
    return this.cuenta.filter(cuenta => cuenta.nombre.toString().toLowerCase().includes(this.busqueda.toLowerCase()));
  }
  isCuentaVencida(cuenta: Cuenta): boolean {
    
    return cuenta.vencida;
  }
  debeMostrarBotones(cuenta: Cuenta): boolean {
    if (cuenta.saldo > 0) {
      return false;
    }
    if (cuenta.saldo === 0 && cuenta.pago > 0) {
      return false;
    }
    return true;
  }
  enviarPago(cuenta: Cuenta) {
    let respaldo=cuenta.nuevoAtributo;
    
    
    if(cuenta.saldo>=cuenta.pago && cuenta.pago>0){
      cuenta.saldo =cuenta.saldo-cuenta.pago;
      cuenta.nuevoAtributo.push(cuenta.fecha+","+cuenta.pago);
      cuenta.pago=parseInt(cuenta.deuda)/25; 
      this.cuentasService.updateCuenta(cuenta).subscribe(() => {
      console.log('Cuenta actualizada');
      console.log(cuenta)
    });
    
    }
    
  }
  
  eliminarCuenta(cuenta: Cuenta) {
    if(cuenta.saldo==0)
    {this.cuentasService.eliminarCuenta(cuenta).subscribe(() => {
      this.cuenta = this.cuenta.filter(c => c !== cuenta);
    });
  }
  }

  renovarCuenta(cuenta: Cuenta){
    if(cuenta.saldo==0){
      cuenta.saldo=parseInt(cuenta.deuda)+(parseInt(cuenta.deuda)*20)/100;
      cuenta.nuevoAtributo=[];
      
      this.cuentasService.updateCuenta(cuenta).subscribe(() => {
        console.log('Cuenta actualizada');
      });
    }
  }
}