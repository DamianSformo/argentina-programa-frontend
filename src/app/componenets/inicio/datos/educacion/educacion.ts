export interface Educacion {
    id: number;
    titulo: string;
    disciplina: string;
    nota: number;
    inicio: number;
    finalizacion: number;
    actualmenteCursando: boolean;
    descripcion: string;

    institucion: {
        nombre: string;
        pais: string;
        ciudad: string;
    }
} 