import { Component } from '@angular/core';
import { Prato } from './prato.model';
import { ServicoPratos } from './pratos.service';

@Component({
  selector: 'cedro-pratos',
  templateUrl: './pratos.component.html',
  styleUrls: ['./pratos.component.scss']
})
export class PratosComponent {
  titulo = "PRATOS";
  pratos: Prato[];

  constructor(private servico: ServicoPratos) {

  }

  ngOnInit() {
    this.buscarPratos();
  }

  buscarPratos() {
    this.servico.buscarPratos().subscribe(resultado => this.pratos = resultado);
  }

  excluirPrato(prato: Prato) {
    this.servico.excluirPrato(prato).subscribe(() => this.buscarPratos());
  }

}
