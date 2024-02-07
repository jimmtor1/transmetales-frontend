export interface Persona {

    id?: number;
    nombres: string | undefined;
    apellidos: string | undefined;
    tipoDocumento: number | undefined;
    numDocumento: string | undefined;
    direccion: string | undefined;
    telefono: string | undefined;
    email: string | undefined;

}

export interface Minero {

    id?: number;
    tipoMinero: number | undefined | null;
    vencimientoRut: Date | undefined;
    certificacionAlcaldia: Date | undefined;
    estado?: number;
    gramosComprados: number | undefined;
    persona:Persona;
}



