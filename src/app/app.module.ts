import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { SacarCuentasComponent } from './sacar-cuentas/sacar-cuentas.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AnalisisComponent } from './analisis/analisis.component';
import { SemanalComponent } from './semanal/semanal.component';
import { VencidasComponent } from './vencidas/vencidas.component';
@NgModule({
  declarations: [
    AppComponent,
    CuentasComponent,
    SacarCuentasComponent,
    AnalisisComponent,
    SemanalComponent,
    VencidasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule,
    FormsModule,
    NgbModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
