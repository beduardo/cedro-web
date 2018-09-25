import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { InicialModule } from './inicial/inicial.module';
import { PratosModule } from './pratos/pratos.module';
import { RestaurantesModule } from './restaurantes/restaurantes.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    MaterialModule,
    InicialModule,
    RestaurantesModule,
    PratosModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
