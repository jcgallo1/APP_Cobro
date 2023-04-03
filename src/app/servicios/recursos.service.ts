import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Cuenta } from '../interfaz/cuenta';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {
  private cuentasUrl = 'https://cobroapp-89901-default-rtdb.firebaseio.com/cuentas.json';

  constructor(private http: HttpClient) { }
 
  getCuentas(){
    return this.http.get(this.cuentasUrl);
    console.log(this.http.get(this.cuentasUrl))
  }
  updateCuenta(cuenta: Cuenta): Observable<void> {
    const cuentaUrl = `https://cobroapp-89901-default-rtdb.firebaseio.com/cuentas/cuenta${cuenta.id}.json`;
    
    return this.http.put<void>(cuentaUrl, cuenta);
}
  eliminarCuenta(cuenta: Cuenta): Observable<void> {
    const cuentaUrl = `https://cobroapp-89901-default-rtdb.firebaseio.com/cuentas/cuenta${cuenta.id}.json`;
    return this.http.delete<void>(cuentaUrl);
  }
  añadirCuenta(cuenta: Cuenta, clave: string): Observable<void> {
    const url = `https://cobroapp-89901-default-rtdb.firebaseio.com/cuentas/${clave}.json`;
    return this.http.put<void>(url, cuenta);
}
}