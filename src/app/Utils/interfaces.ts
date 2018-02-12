export interface IReporte{
    Id:number;
    Serie:string;
    Numerodoc:string;
    Nombre:string;
    Descripcion:string;
    Tipodocumento:string;
    Precio_compra:number;
    Fechaproceso:string;
    Fecharegistro:string;
    Fecha_Ini:string;
    Fecha_Fin:string;
   
}
export interface IPersona {
    nombre : string;
}

export interface Pagination {
    CurrentPage : number;
    ItemsPerPage : number;
    TotalItems : number;
    TotalPages: number;
}
export class PaginatedResult<T> {
    result :  T;
    pagination : Pagination;
}

export interface Predicate<T> {
    (item: T): boolean
}