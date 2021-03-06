import { Component, OnInit } from "@angular/core";
import { Restaurante } from "./restaurante.model";
import { ServicoRestaurantes } from "./restaurantes.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "cedro-restaurante",
  templateUrl: "./restaurante.component.html",
  styleUrls: ["./restaurante.component.scss"]
})
export class RestauranteComponent implements OnInit {
  titulo = "CADASTRO DE RESTAURANTE";
  idRestaurante: string = null;
  restaurante = new Restaurante();
  mensagemErro: string = null;

  constructor(
    private router: Router,
    private rota: ActivatedRoute,
    private servico: ServicoRestaurantes
  ) {}

  ngOnInit() {
    this.idRestaurante = this.rota.snapshot.paramMap.get("id");
    if (this.idRestaurante) {
      this.servico
        .buscaRestaurante(this.idRestaurante)
        .subscribe(restaurante => (this.restaurante = restaurante));
    }
  }

  salvarRestaurante() {
    this.mensagemErro = null;
    this.servico.salvarRestaurante(this.restaurante).subscribe(
      rest => {
        this.router.navigateByUrl("/restaurantes");
      },
      erro => {
        console.log(erro);
        this.mensagemErro = erro;
      }
    );
  }
}
