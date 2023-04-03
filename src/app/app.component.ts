import { Component } from '@angular/core';
import { CuentasService } from './servicios/recursos.service';
import { Cuenta } from './interfaz/cuenta';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cobroAPP';
  cuenta: Cuenta[]=[];

  constructor(private cuentasService: CuentasService, private router: Router) {
  }
  ngOnInit(): void {
    this.cuentasService.getCuentas().subscribe(respuesta => {
      this.cuenta = Object.values(respuesta);
      this.cuentas_vencidas() 
    });
    
  }


  cuentas_vencidas(){
    const hoy = new Date();
    const diaHoy=parseInt(hoy.toString().split(" ")[2])
    for(let i = 0; i < this.cuenta.length; i++){
      const fechaCreacion = new Date(this.cuenta[i].fecha);
      const fechaVencimiento= parseInt(fechaCreacion.toString().split(" ")[2])+1;
      if((hoy.getMonth()+1) > fechaCreacion.getMonth()+1){
        if(diaHoy>=fechaVencimiento ){
          this.cuenta[i].vencida=true;
          this.cuentasService.updateCuenta(this.cuenta[i]).subscribe(() => {
            console.log('Cuenta actualizada');
          });
        }
      }
    }
  }
  
}
