import { Component, Input } from '@angular/core';
import { Firma } from 'src/app/models/firma.model';
import { FirmaService } from 'src/app/services/firma.service';
import { FirmasComponent } from '../../firmas/firmas.component';

@Component({
  selector: 'app-modal-eliminar-firma',
  templateUrl: './modal-eliminar-firma.component.html',
  styleUrls: ['./modal-eliminar-firma.component.css']
})
export class ModalEliminarFirmaComponent {
  @Input() firmadata!:Firma;
  
  constructor(private firmaService: FirmaService, private firmamethodo: FirmasComponent) {
  }

  eliminarFirma(id:number){
    if (id !== undefined && id !== 0) {
      this.firmaService.deleteFirma(id).subscribe(()=>{
        this.firmamethodo.obtenerFirmas();
      })
    }    
  } 
}
