import { Component , OnInit } from "@angular/core";
import { ReporteService } from '../service/reportes.services';
import { IReporte,Pagination,PaginatedResult} from '../Utils/interfaces';
 import {dateFormatPipe} from '../Utils/dateFormatPipe '
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { ExcelService } from '../service/ExcelService';
import { PdfmakeService } from '../service/pdfmake.service';
import { Cell, Row, Table } from '../service/table';

/*configura el idioma del calendar picker */
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { debug } from "util";
defineLocale('es', esLocale); 

//import { AlertService } from '../Alert/alert.service';
@Component({
    selector: 'app-reporte1',
    templateUrl: './reporte1.component.html'   
})
export class Reporte1Component implements OnInit{
/*Variables de paginacion */
public itemsPerPage: number = 5;
public totalItems: number = 0;
public currentPage: number = 1;
listado: IReporte[];
paginacion:any ={};
filter:any ={};
modelGetDatosEditar: any ={};
bsValueIni: Date = new Date();
bsValueFin: Date = new Date();
flagexistRegistro:any = true;
dateFormatPipeFilter = new dateFormatPipe();
public bsConfig: Partial<BsDatepickerConfig>;
 currentDate : any;

    constructor( private personaService: ReporteService,
                 private datePipe: DatePipe,
                 private excelService: ExcelService,
                 private pdfmake : PdfmakeService,
                // private alertService: AlertService
                ){
     
                    this.excelService = excelService;
        // this.currentDate = new Date().getTime();
        // let dateFormatPipeFilter = new dateFormatPipe();
        // this.newDate = dateFormatPipeFilter.transform(this.currentDate);
        // console.log(this.newDate);
        this.bsConfig = Object.assign({},
          {
            dateInputFormat: 'DD/MM/YYYY' ,
            locale: 'es',
            containerClass: 'theme-dark-blue',
            showWeekNumbers: true,
            //maxDate: new Date(),
            //minDate: new Date()
          
          });
        this.filter.Serie = "";        
        this.filter.Numerodoc = "";        
        this.filter.Fecha_Ini = "20180110";        
        this.filter.Fecha_Fin = "20180130";    
        
        this.paginacion.itemsPerPage =this.itemsPerPage;        
        this.paginacion.totalItems = this.totalItems;        
        this.paginacion.currentPage = this.currentPage;    
    }


    exportToPdf(event){
        this.pdfmake = new PdfmakeService();
       // this.alertService.success("Hola segundo Mike");
        this.pdfmake.configureStyles({ header: { fontSize: 18, bold: true } });
        // this.pdfmake.addText('This is a header, using header style', 'header');
        // this.pdfmake.addText('This is an sample PDF printed with pdfMake');
        // // tslint:disable-next-line:max-line-length
        // this.pdfmake.addText('Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines');
    
        // const columns = [
        //   // tslint:disable-next-line:max-line-length
        //   'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
        //   'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
        // ];
    
        // this.pdfmake.addColumns(columns);
        debugger;
        const header1 = new Cell('Serie');
        const header2 = new Cell('Numero Doc');
        const header3 = new Cell('Fecha Reg.');
        const header4 = new Cell('Nombre');
        const header5 = new Cell('Descripción');
        const header6 = new Cell('Tipo Documento');
        const header7 = new Cell('Precio Compra');
        const headerRows = new Row([
                                    header1, 
                                    header2, 
                                    header3,
                                    header4
                                    //,
                                    // header5,
                                    // header6,
                                    // header7
                                ]);   
        
        debugger;
        let listados =  [];
        for(var i = 0; i < this.listado.length; i++){
            const row= new Row([
                                 new Cell(this.listado[i].Serie), 
                                 new Cell(this.listado[i].Numerodoc), 
                                 new Cell(this.listado[i].Fecharegistro),
                                 new Cell(this.listado[i].Nombre)
                                 //, 
                                //  new Cell(this.listado[i].Descripcion), 
                                //  new Cell(this.listado[i].Tipodocumento),
                                //  new Cell( ""+ this.listado[i].Precio_compra)
                                ]);
            listados.push(row);
         } 
        
      
        const widths = [100, '*', 200, '*'];        
        const table = new Table(headerRows, listados, widths);    
        this.pdfmake.addTable(table);
      
        
    
        // const list1 = ['item 1', 'item 2', 'item 3'];
        // const list2 = ['item 1', 'item 2', 'item 3'];
        // const list3 = ['item 1', 'item 2', 'item 3'];
        // const list4 = ['item 1', 'item 2', 'item 3'];
    
        // this.pdfmake.addUnorderedlist(list1);
        // this.pdfmake.addOrderedList(list2);
        // this.pdfmake.addOrderedList(list3, true);
        // this.pdfmake.addOrderedList(list4, false, 50);
    
        // this.pdfmake.addImage('http://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png');
        // this.pdfmake.addImage('http://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png', 300, 150);
        // this.pdfmake.addImage('http://localhost:4200/assets/daniel.jpg', 200);

    
          
        this.pdfmake.download('reporte1');
      
    }
    
    exportToExcel (event){
        this.excelService.exportAsExcelFile(this.listado,'documentoExecel');
    }

    buscar(event){
        this.filter.Fecha_Ini = this.datePipe.transform(this.bsValueIni, 'yyyyMMdd');
        this.filter.Fecha_Fin = this.datePipe.transform(this.bsValueFin, 'yyyyMMdd');     
        this.loadDatos();
    }
    
    ngOnInit(): void {
        this.loadDatos();     
    }	
    pageChanged(event: any): void {
        this.currentPage = event.page;        
        this.loadDatos();
    };
    
    loadDatos():void{   
        
       this.paginacion.currentPage =  this.currentPage;    
       this.personaService.getListPersona(this.filter, this.paginacion).subscribe(
           (res: PaginatedResult<IReporte[]>) =>{  
               
               this.listado = res.result;
               if (this.listado.length>0){
                   this.flagexistRegistro = true;
               }else{
                   this.flagexistRegistro = false;
               }
               this.totalItems = res.pagination.TotalItems;
           },
           error => {
           }            
       );
   }
}