import { Injectable } from '@angular/core';
@Injectable()
export class ConfigService{
    _webApi : string;
    constructor(){
        // this._webApi="http://10.10.101.62/webapiforangular/api/reportes/";
         this._webApi="http://localhost:32883/api/reportes/";
    }
    getWebApiURL(){
        return this._webApi;
    }
}