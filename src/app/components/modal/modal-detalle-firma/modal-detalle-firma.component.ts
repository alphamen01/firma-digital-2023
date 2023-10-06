import { Component, Input, OnInit } from '@angular/core';
import { Firma } from 'src/app/models/firma.model';
import { FirmaService } from 'src/app/services/firma.service';
import { FirmasComponent } from '../../firmas/firmas.component';

@Component({
  selector: 'app-modal-detalle-firma',
  templateUrl: './modal-detalle-firma.component.html',
  styleUrls: ['./modal-detalle-firma.component.css']
})
export class ModalDetalleFirmaComponent implements OnInit{
   @Input() firmadata!:Firma;
   stringOne: string = "1";
   stringTwo: string = "2";
   stringThree: string = "3";
  //  @Input() rubricaimg!: File;   
  //  @Input() imageSrc: string | undefined;   
   constructor(private firmamethodo: FirmasComponent) {
  
  }

  ngOnInit(): void {
    
  }

  descargarCertificado(id:number){
    if (id !== undefined && id !== 0) {
    this.firmamethodo.descargarCertificado(id);
    }
  }
}
