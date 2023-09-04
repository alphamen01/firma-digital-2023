import { Component, Input } from '@angular/core';
import { Firma } from 'src/app/models/firma.model';

@Component({
  selector: 'app-modal-detalle-firma',
  templateUrl: './modal-detalle-firma.component.html',
  styleUrls: ['./modal-detalle-firma.component.css']
})
export class ModalDetalleFirmaComponent {
   @Input() firmadata!:Firma;
   stringOne: string = "1";
   stringTwo: string = "2";
   stringThree: string = "3";
}
