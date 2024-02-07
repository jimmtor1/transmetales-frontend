export interface Traslado {
    id?: number;
    recibido?: string;
    estado: boolean;
    fechaEnvio: Date;
    fechaRecepcion?: Date;
}
