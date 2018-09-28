import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Prato } from "./prato.model";
import { ServicoPratos } from "./pratos.service";
import { ServicoRestaurantes } from "../restaurantes/restaurantes.service";
import { Restaurante } from "../restaurantes/restaurante.model";

@Component({
  selector: "cedro-prato",
  templateUrl: "prato.component.html",
  styleUrls: ["prato.component.scss"]
})
export class PratoComponent implements OnInit {
  titulo = "CADASTRO DE PRATO";
  idPrato: string = null;
  prato = new Prato();
  restaurantes: Restaurante[] = [];
  mensagemErro: string = null;

  constructor(
    private router: Router,
    private rota: ActivatedRoute,
    private servico: ServicoPratos,
    private servicoRestaurantes: ServicoRestaurantes
  ) {}

  ngOnInit() {
    this.idPrato = this.rota.snapshot.paramMap.get("id");
    if (this.idPrato) {
      this.servico
        .buscarPrato(this.idPrato)
        .subscribe(prato => (this.prato = prato));
    }

    this.servicoRestaurantes
      .buscarRestaurantes(null)
      .subscribe(restaurantes => (this.restaurantes = restaurantes));
  }

  salvarPrato() {
    this.mensagemErro = null;
    this.servico.salvarPrato(this.prato).subscribe(
      rest => {
        this.router.navigateByUrl("/pratos");
      },
      erro => {
        console.log(erro);
        this.mensagemErro = erro;
      }
    );
  }
}
