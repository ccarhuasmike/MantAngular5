
import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent }  from './page-not-found.component';

import { HomeComponent } from './home/home.component';
import { Reporte1Component } from './reportes/reporte1.component';
import { Reporte2Component } from './reportes/reporte2.component';

const routes: Routes = [
    { path: 'reporte1', component: Reporte1Component },
    { path: 'reporte2', component: Reporte2Component },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: '**', component: PageNotFoundComponent }    
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule{ }


