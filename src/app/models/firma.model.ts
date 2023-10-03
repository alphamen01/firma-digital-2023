export interface Firma{
    idFirma?: number,
    tipoFirma: string,
    razonSocial:string,
    representanteLegal: string,
    empresaAcreditadora: string,
    fechaEmision: Date,
    fechaVencimiento: Date,
    rutaRubrica?: string,
    certificadoDigital?: string,
    rubricaFile?: File,
    certificadoFile?: File
}