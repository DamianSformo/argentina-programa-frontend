export interface Persona {
    id: number;
    nombre: string;
    apellido: string;
    tipoDocumento: string;
    numeroDocumento: string;
    fechaDeNacimiento: Date;
    descripcion: string;
    buscandoTrabajo: Boolean;
    
    verEmail: Boolean,
    numeroWhatsapp: number,
    verNumeroWhatsapp: Boolean,
    linkedin: string,
    verLinkedin: Boolean,
    verDireccion: Boolean,

    direccion: {
        id: number,
        direccion: string,
        codigoPostal: number,
        ciudad: string;
        pais: string;
    },

    banner: string
}

