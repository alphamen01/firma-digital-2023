import { Component, OnInit  } from '@angular/core';
import { Firma } from 'src/app/models/firma.model';
import { FirmaService } from 'src/app/services/firma.service';

@Component({
  selector: 'app-firmas',
  templateUrl: './firmas.component.html',
  styleUrls: ['./firmas.component.css']
})
export class FirmasComponent implements OnInit {
  firmas: Firma[] = [];

  constructor(private firmaService: FirmaService) {
  }

  ngOnInit(): void {
      
    this.obtenerFirmas();
  }

  obtenerFirmas(){
    this.firmaService.getAllFirmas().subscribe({
      next:(data) =>{
        this.firmas = data;
         console.log(data);
      },error:(e)=>{}
    })
  }
}
