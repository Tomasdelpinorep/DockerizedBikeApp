export interface NewBikeResponse {
    nombre: string;
    marca: string;
    modelo: string;
    estado: Estado;
    estacion: string;
}

export enum Estado {
    Acceptable = "ACCEPTABLE",
    Good = "GOOD",
    NeedsToBeReplaced = "NEEDS_TO_BE_REPLACED",
    New = "NEW",
    WornOut = "WORN_OUT",
}
