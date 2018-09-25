import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicialRoutes } from './inicial/inicial.routes';
import { RestaurantesRoutes } from './restaurantes/restaurantes.routes';
import { PratosRoutes } from './pratos/pratos.routes';

const routes: Routes = [
  { path: '', redirectTo: 'inicial', pathMatch: 'full' },
  ...InicialRoutes,
  ...RestaurantesRoutes,
  ...PratosRoutes,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
