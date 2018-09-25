import { NgModule } from '@angular/core';
import { RestaurantesComponent } from './restaurantes.component';
import { MaterialModule } from '../material.module';
import { ServicoRestaurantes } from './restaurantes.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
    imports: [
        MaterialModule,
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