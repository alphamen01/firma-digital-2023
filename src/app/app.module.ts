import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//componentes
import { NavbarSuperiorComponent } from './components/navbar-superior/navbar-superior.component';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { FirmasComponent } from './components/firmas/firmas.component';
import { DocumentosComponent } from './components/documentos/documentos.component';
import { ModalDetalleFirmaComponent } from './components/modal/modal-detalle-firma/modal-detalle-firma.component';
import { ModalEliminarFirmaComponent } from './components/modal/modal-eliminar-firma/modal-eliminar-firma.component';

//services
import { FirmaService } from './services/firma.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarSuperiorComponent,
    MenuLateralComponent,
    FirmasComponent,
    DocumentosComponent,
    ModalDetalleFirmaComponent,
    ModalEliminarFirmaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [FirmaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
