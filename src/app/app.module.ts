import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

//componentes
import { NavbarSuperiorComponent } from './components/navbar-superior/navbar-superior.component';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { FirmasComponent } from './components/firmas/firmas.component';
import { DocumentosComponent } from './components/documentos/documentos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarSuperiorComponent,
    MenuLateralComponent,
    FirmasComponent,
    DocumentosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
