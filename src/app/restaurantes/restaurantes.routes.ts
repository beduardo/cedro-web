import { Route } from "@angular/router";
import { RestaurantesComponent } from "./restaurantes.component";
import { RestauranteComponent } from "./restaurante.component";
export const RestaurantesRoutes: Route[] = [
  { path: "restaurantes", component: RestaurantesComponent },
  { path: "novorestaurante", component: RestauranteComponent },
  { path: "restaurante/:id", component: RestauranteComponent },
];
