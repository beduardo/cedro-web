import { Component, OnInit } from '@angular/core';
import { Restaurante } from './restaurante.model';
import { ServicoRestaurantes } from './restaurantes.service';

@Component({
  selector: 'cedro-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.scss']
})
export class RestaurantesComponent implements OnInit {
  titulo = "RESTAURANTES";
  restaurantes: Restaurante[];

  constructor(private servico: ServicoRestaurantes) {

  }

  ngOnInit() {
    this.buscarRestaurantes();
  }

  buscarRestaurantes() {
    this.servico.buscarRestaurantes(null).subscribe(resultado => this.restaurantes = resultado);
  }
}
