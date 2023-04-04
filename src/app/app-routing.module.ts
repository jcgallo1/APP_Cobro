import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { SacarCuentasComponent } from './sacar-cuentas/sacar-cuentas.component';
import { VencidasComponent } from './vencidas/vencidas.component';
import { AnalisisComponent } from './analisis/analisis.component';
import { SemanalComponent } from './semanal/semanal.component';
const routes: Routes = [
  {  path: '', redirectTo: 'analisis', pathMatch: 'full'  },
  { path: 'ConfCuentas', component: SacarCuentasComponent },
  { path: 'cuentas', component: CuentasComponent },
  { path: 'vencidas', component: VencidasComponent },
  { path: 'analisis', component: AnalisisComponent },
  { path: 'semanal', component: SemanalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
