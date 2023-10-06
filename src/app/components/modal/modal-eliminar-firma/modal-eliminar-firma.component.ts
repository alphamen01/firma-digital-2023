import { Component, Input } from '@angular/core';
import { Firma } from 'src/app/models/firma.model';
import { FirmaService } from 'src/app/services/firma.service';
import { FirmasComponent } from '../../firmas/firmas.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-eliminar-firma',
  templateUrl: './modal-eliminar-firma.component.html',
  styleUrls: ['./modal-eliminar-firma.component.css']
})
export class ModalEliminarFirmaComponent {
  @Input() firmadata!:Firma;
  
  constructor(private firmaService: FirmaService, private firmamethodo: FirmasComponent, private toastr: ToastrService) {
  }

  eliminarFirma(id:number){
    if (id !== undefined && id !== 0) {
      this.firmaService.deleteFirma(id).subscribe(()=>{
        this.toastr.error('La firma fue eliminada con exito!', 'Registro eliminado');
        this.firmamethodo.obtenerFirmas();
      })
    }    
  } 
}
