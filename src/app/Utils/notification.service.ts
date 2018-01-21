import { Injectable } from '@angular/core';
import { Predicate } from '../utils/interfaces'


// declare var alertify: any;
declare var $:any;
declare var alertify: any;

@Injectable()
export class NotificationService {
    private _notifier: any = alertify;
    constructor() { }
    
    alert(titulo:string,message:string){
        this._notifier.alert(titulo, message, function(){  });
    }
    openConfirmationDialog(titulo:string,message: string, okCallback: () => any) {
        this._notifier.confirm( titulo, 
                                message, 
                                function(){ okCallback(); }, 
                                function(){}
                              );        
    }

    /*
    Prints a success message using the alertify.js lib
    */
    printSuccessMessage(message: string) {
        this._notifier.success(message);
    }
    /*
    Prints an error message using the alertify.js lib
    */
    printErrorMessage(message: string) {
        this._notifier.error(message);
    }
}
