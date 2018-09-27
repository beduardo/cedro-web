import { Route } from "@angular/router";
import { PratosComponent } from "./pratos.component";
import { PratoComponent } from "./prato.component";
export const PratosRoutes: Route[] = [
  { path: "pratos", component: PratosComponent },
  { path: "novoprato", component: PratoComponent },
  { path: "prato/:id", component: PratoComponent },
];
