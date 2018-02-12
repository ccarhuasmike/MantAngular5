import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpModule }    from '@angular/http';
import { HeaderComponent } from './template/header.component';
import { FooterComponent  } from "./template/footer.component";
import { AppComponent } from './app.component';
import { PageNotFoundComponent }  from './page-not-found.component';
import { Reporte1Component } from './reportes/reporte1.component';
import { Reporte2Component } from './reportes/reporte2.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule }  from './app-routing.module';
//import { PaginationModule } from 'ngx-pagination-bootstrap'
import { PaginationModule } from 'ngx-bootstrap/pagination'
/*servicios */
import { ConfigService } from "./Utils/config.service";
import { ReporteService  } from "./service/reportes.services";
import { DatePipe } from '@angular/common';
import { ExcelService } from './service/ExcelService';
import { PdfmakeService } from './service/pdfmake.service';
import { AlertModule } from 'ngx-bootstrap/alert';
// import { AlertComponent } from './Alert/alert.component';
// import { AlertService } from './Alert/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    Reporte1Component,
    Reporte2Component,
    HomeComponent,
    //AlertComponent,
    PageNotFoundComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [ConfigService,
              ReporteService,
              DatePipe,
              ExcelService,
              PdfmakeService,
             // AlertService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
