import { Injectable } from '@angular/core';
import { Http ,RequestOptions, URLSearchParams,Headers  } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { IReporte,IPersona,Pagination,PaginatedResult} from '../Utils/interfaces';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from "../Utils/config.service";
import 'rxjs/add/operator/map'; //Interfaz que este observando cambiar es una biblioteca
import 'rxjs/add/operator/catch';


@Injectable()
export class ReporteService {
    filter:any ={};
    _baseUrl: string = '';
    list:any=[];
    constructor(private http: Http,private configService:ConfigService) {
        this._baseUrl =  configService.getWebApiURL();
    }
    getListPersona(reporte:IReporte,pagina:Pagination): Observable<PaginatedResult<IReporte[]>> {   
        var peginatedResult: PaginatedResult<IReporte[]> = new PaginatedResult<IReporte[]>();
       
              
        // let reportes = {
        //         Serie: reporte.Serie,
        //         Numerodoc: reporte.Numerodoc,
        //         Fecha_Ini: reporte.Fecha_Ini,
        //         Fecha_Fin: reporte.Fecha_Fin,
        //     }
        // let  paginacion = {
        //         CurrentPage:pagina.,
        //         ItemsPerPage:itemsPerPage,
        //         TotalItems:0,
        //         TotalPages:0
        //     }

        // var order = {
        //     "CustomerName":"MS"
        // };
        // //2.
        // var itemDetails = [
        //     { "ItemName": "Desktop", "Quantity": 10, "UnitPrice": 45000 },
        //     { "ItemName": "Laptop", "Quantity": 30, "UnitPrice": 80000 },
        //     { "ItemName": "Router", "Quantity": 50, "UnitPrice": 5000 }
        // ];

        //let objectttt=

        
        debugger;      
        let myHeaders = new Headers();
       // myHeaders.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        myHeaders.append("Content-Type", 'application/json');        
        let options = new RequestOptions({ headers: myHeaders });
        return this.http.post(this._baseUrl + 'listarReporte',JSON.stringify({  reportes: reporte,      paginacion: pagina }),options)
        .map(res => {
            this.list = res.json();
            peginatedResult.result = JSON.parse(this.list.DataJson);
            var paginationHeader: Pagination = this.getSerialized<Pagination>(JSON.parse( this.list.paginacion));
            peginatedResult.pagination = paginationHeader;
            return peginatedResult;
        })
        .catch(this.handleError);
    }
    getSerialized<T>(arg: any): T {
        return <T>JSON.parse(JSON.stringify(arg));
    }   
    private handleError(error: any) {
        var applicationError = error.headers.get('Application-Error');
        var serverError = error.json();
        var modelStateErrors: string = '';

        if (!serverError.type) {
            console.log(serverError);
            for (var key in serverError) {
                if (serverError[key])
                    modelStateErrors += serverError[key] + '\n';
            }
        }
        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
        return Observable.throw(applicationError || modelStateErrors || 'Server error');
    }

    getFormUrlEncoded(toConvert) {
		const formBody = [];
		for (const property in toConvert) {
			const encodedKey = encodeURIComponent(property);
			const encodedValue = encodeURIComponent(toConvert[property]);
			formBody.push(encodedKey + '=' + encodedValue);
		}
		return formBody.join('&');
    }
    
    serializeObj(obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

        return result.join("&");
    }

}