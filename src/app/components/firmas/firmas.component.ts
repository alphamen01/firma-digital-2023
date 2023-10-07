import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firma } from 'src/app/models/firma.model';
import { FirmaService } from 'src/app/services/firma.service';
import { format } from 'date-fns';
import { ToastrService } from 'ngx-toastr';

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
  // rubricaimg!: File;  
  // imageSrc: string | undefined;

  agregarFirma: FormGroup;
  editarFirma: FormGroup;
  modalTitle: string = 'Agregar';
  adddata?:Firma;

  /* ---------Descarga------ */
  cdata?:Firma;
  /*----------------------- */

  //editCertificado!: File;
  constructor(private firmaService: FirmaService, private fb: FormBuilder, private toastr: ToastrService) {
    /* Para el formulario de agregar*/
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
    /* Para el formulario de editar datos de la firma */
    this.editarFirma = this.fb.group({
      tipoFirma: ['',Validators.required],
      razonSocial: ['',Validators.required],
      representanteLegal: ['',Validators.required],
      empresaAcreditadora: ['',Validators.required],
      fechaEmision: ['',Validators.required],
      fechaVencimiento: ['',Validators.required]
    })

  }

  openModal(id?:number): void {
  
    this.modalTitle = id ? 'Editar' : 'Agregar';
      //console.log(id);
      if(id !== undefined){
      this.firmaService.getFirma(id!).subscribe({
        next:(datafirma) =>{
          this.adddata = datafirma
          //console.log(this.adddata);
          //console.log(datafirma.certificadoDigital)
          //console.log(datafirma.rutaRubrica)
          const fecha = new Date(datafirma.fechaEmision);
          const fecha1 = new Date(datafirma.fechaVencimiento);
          // const blobCertificado = new Blob([datafirma.certificadoDigital!], { type: 'application/pdf' });
          // console.log(blobCertificado)
          //  const fileCertificado = new File([blobCertificado!],  ''+datafirma.razonSocial +'.pdf', { type: 'application/pdf' }); 
          //  console.log(fileCertificado)
          //   this.editCertificado = fileCertificado;
          this.editarFirma.patchValue({
            tipoFirma: datafirma.tipoFirma,
            razonSocial: datafirma.razonSocial,
            representanteLegal: datafirma.representanteLegal,
            empresaAcreditadora: datafirma.empresaAcreditadora,            
            fechaEmision: format(fecha, 'yyyy-MM-dd'),
            fechaVencimiento: format(fecha1, 'yyyy-MM-dd'),
            //certificadoDigital: fileCertificado
            // rutaRubrica: datafirma.rutaRubrica
          })

          //console.log(this.agregarFirma)
  
        },error:(e)=>{}
      })
      }else{
        this.adddata = undefined;
      }
      
    }

  ngOnInit(): void {
      
    this.obtenerFirmas();
  }
/* --------------------------CARGA CERTIFICADO----------------------------------------------------------- */
  // onFileSelect(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.agregarFirma.get('certificadoDigital')!.setValue(file);
      
  //   }
  // } 

  // onFileChange(event: any) {
  //   const file = event.target.files[0]; // Obtener el archivo seleccionado
  //   this.agregarFirma.get('certificadoDigital')?.setValue(file); // Asignar el archivo al FormControl
  // }

  onFileChange(event: any) {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
  
    // Verificar si el archivo es una PDF
    if (this.esArchivoPDF(file)) {
      this.agregarFirma.get('certificadoDigital')?.setValue(file); // Asignar el archivo al FormControl
    } else {
      // El archivo no es un PDF, puedes mostrar un mensaje de error o realizar alguna acción.
      console.error('Por favor, seleccione un archivo PDF.');
      // También puedes reiniciar el input de archivo para deseleccionar el archivo no válido.
      event.target.value = null;
    }
  }    

  esArchivoPDF(file: File): boolean {
    // Verificar la extensión del archivo
    const extension = file.name.split('.').pop()?.toLowerCase();
    return extension === 'pdf';
  }
/*--------------------------------------------------------------------------------------------------------- */

/* ------------------------------------CARGA RUBRICA------------------------------------ */
  // onFileSelect1(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];      
  //     this.agregarFirma.get('rutaRubrica')!.setValue(file);        
  //   }
  // }

  // onFileChange1(event: any) {
  //   const file = event.target.files[0]; // Obtener el archivo seleccionado
  //   this.agregarFirma.get('rutaRubrica')?.setValue(file); // Asignar el archivo al FormControl
  // }

  onFileChange1(event: any) {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
  
    // Verificar si el archivo es un archivo JPG o PNG
    if (this.esArchivoJPGoPNG(file)) {
      this.agregarFirma.get('rutaRubrica')?.setValue(file); // Asignar el archivo al FormControl
    } else {
      // El archivo no es un JPG o PNG, puedes mostrar un mensaje de error o realizar alguna acción.
      console.error('Por favor, seleccione un archivo JPG o PNG.');
      // También puedes reiniciar el input de archivo para deseleccionar el archivo no válido.
      event.target.value = null;
    }
  }
  
  esArchivoJPGoPNG(file: File): boolean {
    // Verificar la extensión del archivo
    const extension = file.name.split('.').pop()?.toLowerCase();
    return extension === 'jpg' || extension === 'png';
  }
/*--------------------------------------------------------------------------------------------------------- */

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
        /*console.log(datafirma.rutaRubrica)
         const blobRubrica = new Blob([datafirma.rutaRubrica!], { type: 'image/jpeg' });
         console.log(blobRubrica)
         const fileRubrica = new File([blobRubrica!], `firma-${datafirma.razonSocial}.jpg`, { type: 'image/jpeg' }); 
         console.log(fileRubrica)
         this.rubricaimg = fileRubrica
         console.log(this.rubricaimg)
         const reader = new FileReader();
         reader.onload = (e: any) => {
          this.imageSrc = e.target.result;
          console.log(this.imageSrc)
        };
        reader.readAsDataURL(fileRubrica); */       
         this.firmadata = datafirma
         console.log(this.firmadata);
         
      },error:(e)=>{}
    })
  }

/*---------------------------------- Descarga de Firma y Certificado----------------------------------------------*/
descargarFirma(id:number){
  this.firmaService.getFirma(id).subscribe({
    next:(datafirma) =>{
      this.cdata = datafirma
      //console.log(this.cdata); 
    },error:(e)=>{}
  })  
  if (id !== undefined && id !== 0) {
    this.firmaService.getRubrica(id).subscribe((data: Blob)=>{
      // Crea una URL de objeto para el Blob
      const blob = new Blob([data], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);         
      // Crea un enlace para descargar el archivo PDF
      const a = document.createElement('a');
      a.href = url;
      a.download = `firma-${this.cdata?.razonSocial}.jpg`; // Nombre del archivo al descargarlo
      a.target = '_blank'; // Abre el enlace en una nueva pestaña
      // Simula un clic en el enlace para iniciar la descarga
      a.click();
      // Libera la URL del objeto para evitar pérdidas de memoria
      window.URL.revokeObjectURL(url);
      this.toastr.info('El proceso de descarga de la rubrica fue exitoso!', 'Descarga Rubrica');
      console.log('El proceso de descarga de la rubrica se completo exitosamente')
    })
  } 
}

descargarCertificado(id:number){
  this.firmaService.getFirma(id).subscribe({
    next:(datacertificado) =>{
      this.cdata = datacertificado
      //console.log(this.cdata); 
    },error:(e)=>{}
  })
  if (id !== undefined && id !== 0) {
    this.firmaService.getCertificado(id).subscribe((data: Blob)=>{
      // Crea una URL de objeto para el Blob
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);         
      // Crea un enlace para descargar el archivo PDF
      const a = document.createElement('a');
      a.href = url;
      a.download = `certifificado-${this.cdata?.razonSocial}.pdf`; // Nombre del archivo al descargarlo
      a.target = '_blank'; // Abre el enlace en una nueva pestaña
      // Simula un clic en el enlace para iniciar la descarga
      a.click();
      // Libera la URL del objeto para evitar pérdidas de memoria
      window.URL.revokeObjectURL(url);
      this.toastr.info('El proceso de descarga del certificado fue exitoso!', 'Descarga Certificado');
      console.log('El proceso de descarga del certificado se completo exitosamente')
    })
  }
}
/* ------------------------------------------------------------------------------------------------------------ */

  agregar(id?: number | null){
    //console.log(id);
    if (id == undefined || id === 0) {
      //AGREGAR

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
        //console.log(firmaform.certificadoFile)
        //console.log(firmaform.rubricaFile)

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

        //console.log(formData)

        this.firmaService.postFirma(formData).subscribe(data =>{
              //console.log(data);
              this.toastr.success('La firma fue creada con exito!', 'Registro creado');
              this.obtenerFirmas();
            },
            error => {
              console.error('Error en la solicitud:', error);
        })
        
    }else{
      //EDITAR 

      //console.log(this.editarFirma);
        const firmaform : Firma={
          idFirma: this.adddata?.idFirma,
          tipoFirma:this.editarFirma.get('tipoFirma')?.value,
          razonSocial:this.editarFirma.get('razonSocial')?.value,
          representanteLegal:this.editarFirma.get('representanteLegal')?.value,
          empresaAcreditadora: this.editarFirma.get('empresaAcreditadora')?.value,
          fechaEmision: this.editarFirma.get('fechaEmision')?.value,
          fechaVencimiento: this.editarFirma.get('fechaVencimiento')?.value,
          rutaRubrica: this.adddata?.rutaRubrica,
          certificadoDigital: this.adddata?.certificadoDigital
        }
        //console.log(firmaform.rutaRubrica)
        //console.log(firmaform.certificadoDigital)

        const formData = new FormData();
        formData.append('idFirma', firmaform.idFirma!.toString());
        formData.append('FechaVencimiento', new Date(firmaform.fechaVencimiento).toUTCString());
        formData.append('EmpresaAcreditadora', firmaform.empresaAcreditadora);
        formData.append('certificadoDigital',firmaform.certificadoDigital!);
        //formData.append('certificadoFile', this.agregarFirma.get('certificadoDigital')?.value);
        formData.append('TipoFirma', firmaform.tipoFirma);
        formData.append('rutaRubrica', firmaform.rutaRubrica!);
        //formData.append('rubricaFile', this.agregarFirma.get('rutaRubrica')?.value);
        formData.append('RepresentanteLegal',firmaform.representanteLegal);
        formData.append('RazonSocial', firmaform.razonSocial);
        formData.append('FechaEmision', new Date(firmaform.fechaEmision).toUTCString());

        //console.log(formData)

        this.firmaService.putFirma(id,formData).subscribe(data =>{
              //console.log(data);
              this.toastr.info('La datos de la firma fue actualizada con exito!', 'Registro actualizado');
              this.obtenerFirmas();
            },
            error => {
              console.error('Error en la solicitud:', error);
        })
    }
    this.editarFirma.reset();
    this.agregarFirma.reset();

    // Obtener el elemento de entrada de tipo archivo
    var inputFileC = document.getElementById('certificadoDigital') as HTMLInputElement;
    var inputFileR = document.getElementById('rutaRubrica') as HTMLInputElement;

    // Limpiar el valor del campo de entrada de tipo archivo
    inputFileC.value = '';
    inputFileR.value = '';
    
  }

}
