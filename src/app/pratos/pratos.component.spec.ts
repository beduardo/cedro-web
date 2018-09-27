import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, async, fakeAsync, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "../material.module";
import "rxjs/add/observable/of";
import { Observable } from "rxjs/Observable";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ServicoPratos } from "./pratos.service";
import { Prato } from "./prato.model";
import { PratosComponent } from "./pratos.component";

let servicoPratosStub: Partial<ServicoPratos>;

describe("PratosComponent", () => {
  beforeEach(async(() => {
    servicoPratosStub = {
      buscarPratos: () => Observable.of<Prato[]>(),
      excluirPrato: (prato: Prato) => Observable.of<any>()
    };

    TestBed.configureTestingModule({
      imports: [MaterialModule, RouterTestingModule, FormsModule, NoopAnimationsModule],
      declarations: [PratosComponent],
      providers: [
        { provide: ServicoPratos, useValue: servicoPratosStub }
      ]
    }).compileComponents();
  }));

  it("componente foi criado", async(() => {
    const fixture = TestBed.createComponent(PratosComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it("deve possuir o título PRATOS", async(() => {
    const fixture = TestBed.createComponent(PratosComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.titulo).toEqual("PRATOS");
  }));

  it("deve renderizar o titulo em um span", async(() => {
    const fixture = TestBed.createComponent(PratosComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector(".titulo-secao").textContent).toContain(
      fixture.componentInstance.titulo
    );
  }));

  it("deve buscar a lista de pratos ao iniciar", async(() => {
    const servico = TestBed.get(ServicoPratos);
    const spyBusca = spyOn(servico, "buscarPratos").and.returnValue(
      Observable.of<Prato[]>([
        { id: "1", nome: "Prato A", preco: 12, restauranteId: "001", restauranteNome: "Restaurante A" },
        { id: "2", nome: "Prato B", preco: 12, restauranteId: "002", restauranteNome: "Restaurante B" }
      ])
    );

    const fixture = TestBed.createComponent(PratosComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.pratos).toEqual([
        { id: "1", nome: "Prato A", preco: 12, restauranteId: "001", restauranteNome: "Restaurante A" },
        { id: "2", nome: "Prato B", preco: 12, restauranteId: "002", restauranteNome: "Restaurante B" }
    ]);
  }));

  it("deve renderizar a lista de pratos em uma table", async(() => {
    const servico = TestBed.get(ServicoPratos);
    const listaASerRetornada = [
      { id: "1", nome: "Prato A", preco: 12, restauranteId: "001", restauranteNome: "Restaurante A"  },
      { id: "2", nome: "Prato B", preco: 14.5, restauranteId: "002", restauranteNome: "Restaurante B"  },
      { id: "3", nome: "Prato C", preco: 17, restauranteId: "001", restauranteNome: "Restaurante A"  }
    ];

    const spyBusca = spyOn(servico, "buscarPratos").and.returnValue(
      Observable.of<Prato[]>(listaASerRetornada)
    );

    const fixture = TestBed.createComponent(PratosComponent);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    //Verifica a quantidade de linhas
    const linhasPrato = compiled.querySelectorAll(
      "table tr.linha-prato"
    );
    expect(linhasPrato.length).toBe(3);

    //Verifica o conteúdo das linhas
    for (var i = 0; i < listaASerRetornada.length; ++i) {
      var pratoIt = listaASerRetornada[i];
      var trIt = linhasPrato[i];

      //Precisa conter um botão de exclusão (um button)
      expect(
        trIt.querySelector("td button.excluir-prato")
      ).not.toBeNull();

      //Precisa conter um botão de edição (um <a>)
      expect(
        trIt.querySelector("td a.editar-prato").getAttribute("href")
      ).toBe(`/prato/${pratoIt.id}`);

      //Precisa conter uma coluna com o nome do restaurante
      expect(trIt.querySelector("td.nome-restaurante").textContent).toContain(
        pratoIt.restauranteNome
      );

      //Precisa conter uma coluna com o nome do prato
      expect(trIt.querySelector("td.nome-prato").textContent).toContain(
        pratoIt.nome
      );

      //Precisa conter uma coluna com o preço do prato
      expect(trIt.querySelector("td.preco-prato").textContent).toContain(
        pratoIt.preco
      );
    }
  }));

  it("ao clicar no botão de exclusão de uma linha, os método no componente é acionado corretamente", async(() => {
    const servico = TestBed.get(ServicoPratos);
    const pratoTeste: Prato = { id: "1", nome: "Prato A", preco: 25, restauranteId: "001", restauranteNome: "Restaurante A" };
    spyOn(servico, "buscarPratos").and.returnValue(
      Observable.of<Prato[]>([pratoTeste])
    );

    const fixture = TestBed.createComponent(PratosComponent);
    fixture.detectChanges();

    // const compiled = fixture.debugElement.nativeElement;
    const spyOnClick = spyOn(fixture.componentInstance, "excluirPrato");
    const botaoExcluir = fixture.debugElement.query(
      By.css("button.excluir-prato")
    );

    botaoExcluir.triggerEventHandler("click", null);

    expect(fixture.componentInstance.excluirPrato).toHaveBeenCalledWith(
      pratoTeste
    );
  }));

  it("o método excluirPrato aciona os métodos corretos do serviço", async(() => {
    const servico = TestBed.get(ServicoPratos);
    const pratoTeste: Prato = { id: "1", nome: "Prato A", preco: 12, restauranteId: "001", restauranteNome: "Restaurante A" };
    const spyBusca = spyOn(servico, "buscarPratos").and.returnValue(
      Observable.of<Prato[]>([])
    );
    const spyExcluir = spyOn(servico, "excluirPrato").and.returnValue(
      Observable.of<any>({})
    );

    const fixture = TestBed.createComponent(PratosComponent);
    fixture.detectChanges();

    expect(spyBusca).toHaveBeenCalledTimes(1);
    expect(spyExcluir).not.toHaveBeenCalled();

    fixture.componentInstance.excluirPrato(pratoTeste);
    expect(spyBusca).toHaveBeenCalledTimes(2);
    expect(spyExcluir).toHaveBeenCalledWith(pratoTeste);
  }));

  it("deve renderizar um <a> para novo prato", () => {
    const fixture = TestBed.createComponent(PratosComponent);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    //Verifica a quantidade de linhas
    const ancoraNovoPrato = compiled.querySelector("a.novo-prato");
    expect(ancoraNovoPrato).toBeTruthy();
    expect(ancoraNovoPrato.getAttribute('routerlink')).toBe('/novoprato');
  });

});
