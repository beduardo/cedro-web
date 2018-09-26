import { NgModule } from '@angular/core';
import { RestaurantesComponent } from './restaurantes.component';
import { MaterialModule } from '../material.module';
import { ServicoRestaurantes } from './restaurantes.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        RouterModule,
        HttpClientModule
    ],
    declarations: [
        RestaurantesComponent
    ],
    providers: [
        ServicoRestaurantes,
    ]
})
export class RestaurantesModule { }