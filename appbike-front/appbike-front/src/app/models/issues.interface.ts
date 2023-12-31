// Generated by https://quicktype.io

export interface IssueResponse {
    content:          Issue[];
    pageable:         Pageable;
    totalPages:       number;
    totalElements:    number;
    last:             boolean;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

export interface Issue {
    id:               number;
    fechaProgramada:  string;
    fechaRealizacion: string | null;
    anotaciones:      string;
    nombreEstacion:   string;
    nombreTrabajador: string;
    estado:           string;
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    unpaged:    boolean;
    paged:      boolean;
}

export interface Sort {
    empty:    boolean;
    unsorted: boolean;
    sorted:   boolean;
}
