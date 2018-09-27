import { NgModule } from '@angular/core';
import { PratosComponent } from './pratos.component';
import { ServicoPratos } from './pratos.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicoRestaurantes } from '../restaurantes/restaurantes.service';
import { PratoComponent } from './prato.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        RouterModule,
        HttpClientModule
    ],
    declarations: [
        PratosComponent,
        PratoComponent,
    ],
    providers: [
        ServicoPratos,
        ServicoRestaurantes,
    ]
})
export class PratosModule { }