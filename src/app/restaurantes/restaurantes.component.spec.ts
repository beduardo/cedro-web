import { TestBed, async, fakeAsync, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "../material.module";
import { RestaurantesComponent } from "./restaurantes.component";
import { ServicoRestaurantes } from "./restaurantes.service";
import "rxjs/add/observable/of";
import { Observable } from "rxjs/Observable";
import { Restaurante } from "./restaurante.model";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

let servicoRestaurantesStub: Partial<ServicoRestaurantes>;

describe("RestaurantesComponent", () => {
  beforeEach(async(() => {
    servicoRestaurantesStub = {
      buscarRestaurantes: (filtro: string) => Observable.of<Restaurante[]>(),
      excluirRestaurante: (restaurante: Restaurante) => Observable.of<any>()
    };

    TestBed.configureTestingModule({
      imports: [MaterialModule, RouterTestingModule, FormsModule],
      declarations: [RestaurantesComponent],
      providers: [
        { provide: ServicoRestaurantes, useValue: servicoRestaurantesStub }
      ]
    }).compileComponents();
  }));
  it("componente foi criado", async(() => {
    const fixture = TestBed.createComponent(RestaurantesComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it("deve possuir o título RESTAURANTES", async(() => {
    const fixture = TestBed.createComponent(RestaurantesComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.titulo).toEqual("RESTAURANTES");
  }));

  it("deve renderizar o titulo em um span", async(() => {
    const fixture = TestBed.createComponent(RestaurantesComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector(".titulo-secao").textContent).toContain(
      fixture.componentInstance.titulo
    );
  }));

  it("deve buscar a lista de restaurantes ao iniciar", async(() => {
    const servico = TestBed.get(ServicoRestaurantes);
    const spyBusca = spyOn(servico, "buscarRestaurantes").and.returnValue(
      Observable.of<Restaurante[]>([
        { id: "1", nome: "Restaurante A" },
        { id: "2", nome: "Restaurante B" }
      ])
    );

    const fixture = TestBed.createComponent(RestaurantesComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.restaurantes).toEqual([
      { id: "1", nome: "Restaurante A" },
      { id: "2", nome: "Restaurante B" }
    ]);
  }));

  it("deve renderizar a lista de restaurantes em uma table", async(() => {
    const servico = TestBed.get(ServicoRestaurantes);
    const listaASerRetornada = [
      { id: "1", nome: "Restaurante A" },
      { id: "2", nome: "Restaurante B" },
      { id: "3", nome: "Restaurante C" }
    ];

    const spyBusca = spyOn(servico, "buscarRestaurantes").and.returnValue(
      Observable.of<Restaurante[]>(listaASerRetornada)
    );

    const fixture = TestBed.createComponent(RestaurantesComponent);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    //Verifica a quantidade de linhas
    const linhasRestaurante = compiled.querySelectorAll(
      "table tr.linha-restaurante"
    );
    expect(linhasRestaurante.length).toBe(3);
    // console.log(linhasRestaurante);

    //Verifica o conteúdo das linhas
    for (var i = 0; i < listaASerRetornada.length; ++i) {
      var restauranteIt = listaASerRetornada[i];
      var trIt = linhasRestaurante[i];

      //Precisa conter um botão de exclusão (um button)
      expect(
        trIt.querySelector("td button.excluir-restaurante")
      ).not.toBeNull();

      //Precisa conter um botão de edição (um <a>)
      expect(
        trIt.querySelector("td a.editar-restaurante").getAttribute("href")
      ).toBe(`/restaurante/${restauranteIt.id}`);

      //Precisa conter uma coluna com o nome do restaurante
      expect(trIt.querySelector("td.nome-restaurante").textContent).toContain(
        restauranteIt.nome
      );
    }
  }));

  it("ao clicar no botão de exclusão de uma linha, os método no componente é acionado corretamente", async(() => {
    const servico = TestBed.get(ServicoRestaurantes);
    const restauranteTeste: Restaurante = { id: "1", nome: "Restaurante A" };
    spyOn(servico, "buscarRestaurantes").and.returnValue(
      Observable.of<Restaurante[]>([restauranteTeste])
    );

    const fixture = TestBed.createComponent(RestaurantesComponent);
    fixture.detectChanges();

    // const compiled = fixture.debugElement.nativeElement;
    const spyOnClick = spyOn(fixture.componentInstance, "excluirRestaurante");
    const botaoExcluir = fixture.debugElement.query(
      By.css("button.excluir-restaurante")
    );

    botaoExcluir.triggerEventHandler("click", null);

    expect(fixture.componentInstance.excluirRestaurante).toHaveBeenCalledWith(
      restauranteTeste
    );
  }));

  it("o método excluirRestaurante aciona os métodos corretos do serviço", async(() => {
    const servico = TestBed.get(ServicoRestaurantes);
    const restauranteTeste: Restaurante = { id: "1", nome: "Restaurante A" };
    const spyBusca = spyOn(servico, "buscarRestaurantes").and.returnValue(
      Observable.of<Restaurante[]>([])
    );
    const spyExcluir = spyOn(servico, "excluirRestaurante").and.returnValue(
      Observable.of<any>({})
    );

    const fixture = TestBed.createComponent(RestaurantesComponent);
    fixture.detectChanges();

    expect(spyBusca).toHaveBeenCalledTimes(1);
    expect(spyExcluir).not.toHaveBeenCalled();

    fixture.componentInstance.excluirRestaurante(restauranteTeste);
    expect(spyBusca).toHaveBeenCalledTimes(2);
    expect(spyExcluir).toHaveBeenCalledWith(restauranteTeste);
  }));

  it("deve enviar o filtro ao serviço", async(() => {
    const servico = TestBed.get(ServicoRestaurantes);
    const spyBusca = spyOn(servico, "buscarRestaurantes").and.returnValue(
      Observable.of<Restaurante[]>([])
    );

    const fixture = TestBed.createComponent(RestaurantesComponent);
    fixture.detectChanges();

    fixture.componentInstance.filtro = "novofiltro";
    fixture.componentInstance.buscarRestaurantes();

    expect(servico.buscarRestaurantes).toHaveBeenCalledWith("novofiltro");
  }));

  it("deve possuir um campo filtro para preencher a propriedade", fakeAsync(() => {
    const fixture = TestBed.createComponent(RestaurantesComponent);
    const inputFiltro = fixture.debugElement.query(
      By.css("[name^='filtropesquisa']")
    );
    expect(inputFiltro).toBeTruthy();
    const el = inputFiltro.nativeElement;

    fixture.detectChanges();
    tick();
    expect(fixture.componentInstance.filtro).toBeFalsy();

    fixture.componentInstance.filtro = "filtroantigo";
    fixture.detectChanges();
    tick();

    expect(el.value).toEqual("filtroantigo");

    el.value = "novofiltro";
    el.dispatchEvent(new Event("input"));
    tick();

    expect(fixture.componentInstance.filtro).toBe("novofiltro");
  }));

  it("deve renderizar um <a> para novo restaurante", () => {
    const fixture = TestBed.createComponent(RestaurantesComponent);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    //Verifica a quantidade de linhas
    const ancoraNovoRestaurante = compiled.querySelector("a.novo-restaurante");
    expect(ancoraNovoRestaurante).toBeTruthy();
    expect(ancoraNovoRestaurante.getAttribute('routerlink')).toBe('/novorestaurante');

  });

  it("deve renderizar um <button> para nova pesquisa", () => {
    const fixture = TestBed.createComponent(RestaurantesComponent);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    //Verifica a quantidade de linhas
    const botaoPesquisar = compiled.querySelector("button.pesquisar");
    expect(botaoPesquisar).toBeTruthy();
  });

  it("ao clicar no botão Pesquisar, o método no componente é acionado corretamente", async(() => {
    const fixture = TestBed.createComponent(RestaurantesComponent);
    fixture.detectChanges();

    // const compiled = fixture.debugElement.nativeElement;
    const spyOnClick = spyOn(fixture.componentInstance, "buscarRestaurantes");
    const botaoExcluir = fixture.debugElement.query(
      By.css("button.pesquisar")
    );

    expect(fixture.componentInstance.buscarRestaurantes).not.toHaveBeenCalled();
    botaoExcluir.triggerEventHandler("click", null);
    expect(fixture.componentInstance.buscarRestaurantes).toHaveBeenCalled();
  }));


});
