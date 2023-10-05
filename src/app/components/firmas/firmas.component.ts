import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firma } from 'src/app/models/firma.model';
import { FirmaService } from 'src/app/services/firma.service';

@Component({
  selector: 'app-firmas',
  templateUrl: './firmas.component.html',
  styleUrls: ['./firmas.component.css']
})
export class FirmasComponent implements OnInit {
  firmas: Firma[] = [];
  stringOne: string = "1";
  stringTwo: string = "2";
  stringThree: string = "3";

  firmadata!: Firma;

  agregarFirma: FormGroup;
  // rubricaFile!: File;
  // certificadoFile!: File;

  constructor(private firmaService: FirmaService, private fb: FormBuilder) {
    this.agregarFirma = this.fb.group({
      tipoFirma: ['',Validators.required],
      certificadoDigital: [null,Validators.required],
      razonSocial: ['',Validators.required],
      representanteLegal: ['',Validators.required],
      empresaAcreditadora: ['',Validators.required],
      fechaEmision: ['',Validators.required],
      fechaVencimiento: ['',Validators.required],
      rutaRubrica: [null,Validators.required]
    })
  }

  ngOnInit(): void {
      
    this.obtenerFirmas();
  }

  // onFileSelect(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.agregarFirma.get('certificadoDigital')!.setValue(file);
      
  //   }
  // }

  // onFileSelect1(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];      
  //     this.agregarFirma.get('rutaRubrica')!.setValue(file);        
  //   }
  // }

  onFileChange(event: any) {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
    this.agregarFirma.get('certificadoDigital')?.setValue(file); // Asignar el archivo al FormControl
  }

  onFileChange1(event: any) {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
    this.agregarFirma.get('rutaRubrica')?.setValue(file); // Asignar el archivo al FormControl
  }

  obtenerFirmas(){
    this.firmaService.getAllFirmas().subscribe({
      next:(data) =>{
        this.firmas = data;
         console.log(data);
      },error:(e)=>{}
    })
  }

  obtenerFirma(id:number){
    this.firmaService.getFirma(id).subscribe({
      next:(datafirma) =>{
        this.firmadata = datafirma
         console.log(datafirma);
      },error:(e)=>{}
    })
  }

  agregar(){
    //console.log(this.agregarFirma);
        const firmaform : Firma={
          tipoFirma:this.agregarFirma.get('tipoFirma')?.value,
          razonSocial:this.agregarFirma.get('razonSocial')?.value,
          representanteLegal:this.agregarFirma.get('representanteLegal')?.value,
          empresaAcreditadora: this.agregarFirma.get('empresaAcreditadora')?.value,
          fechaEmision: this.agregarFirma.get('fechaEmision')?.value,
          fechaVencimiento: this.agregarFirma.get('fechaVencimiento')?.value,
          rubricaFile: this.agregarFirma.get('rutaRubrica')?.value,
          certificadoFile: this.agregarFirma.get('certificadoDigital')?.value
        }
        console.log(firmaform.certificadoFile)
        console.log(firmaform.rubricaFile)

        const formData = new FormData();
        formData.append('FechaVencimiento', new Date(firmaform.fechaVencimiento).toUTCString());
        formData.append('EmpresaAcreditadora', firmaform.empresaAcreditadora);
        formData.append('certificadoFile',firmaform.certificadoFile!);
        //formData.append('certificadoFile', this.agregarFirma.get('certificadoDigital')?.value);
        formData.append('TipoFirma', firmaform.tipoFirma);
        formData.append('rubricaFile', firmaform.rubricaFile!);
        //formData.append('rubricaFile', this.agregarFirma.get('rutaRubrica')?.value);
        formData.append('RepresentanteLegal',firmaform.representanteLegal);
        formData.append('RazonSocial', firmaform.razonSocial);
        formData.append('FechaEmision', new Date(firmaform.fechaEmision).toUTCString());

        console.log(formData)

        this.firmaService.postFirma(formData).subscribe(data =>{
              console.log(data);
              this.obtenerFirmas();
            },
            error => {
              console.error('Error en la solicitud:', error);
        })
          
        this.agregarFirma.reset();
  }

}
