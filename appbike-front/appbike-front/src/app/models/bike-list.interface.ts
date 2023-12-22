export interface BikeListResponse {
    content: Bike[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    empty: boolean;
}

export interface Bike {
    uuid: string;
    nombre: string;
    marca: string;
    modelo: string;
    estado: string;
    usos: number;
    estacion: string;
}

export enum Estado {
    Acceptable = "ACCEPTABLE",
    Good = "GOOD",
    NeedsToBeReplaced = "NEEDS_TO_BE_REPLACED",
    New = "NEW",
    WornOut = "WORN_OUT",
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    unpaged: boolean;
    paged: boolean;
}

export interface Sort {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
}
