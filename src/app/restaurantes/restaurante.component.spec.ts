import { TestBed, async, fakeAsync, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "../material.module";
import { ServicoRestaurantes } from "./restaurantes.service";
import "rxjs/add/observable/of";
import { Observable } from "rxjs/Observable";
import { Restaurante } from "./restaurante.model";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RestauranteComponent } from "./restaurante.component";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivatedRouteStub } from "../testing/ActivatedRouteStub";

describe("RestauranteComponent", () => {
  let servicoRestaurantesStub: Partial<ServicoRestaurantes>;
  let spyRouter;
  beforeEach(async(() => {
    servicoRestaurantesStub = {
      buscaRestaurante: (id: string) => Observable.of<Restaurante>(),
      salvarRestaurante: (restaurante: Restaurante) =>
        Observable.of<Restaurante>(new Restaurante())
    };

    TestBed.configureTestingModule({
      imports: [MaterialModule, RouterTestingModule, FormsModule],
      declarations: [RestauranteComponent],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: ServicoRestaurantes, useValue: servicoRestaurantesStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(RestauranteComponent);

    const router = TestBed.get(Router);
    spyRouter = spyOn(router, "navigateByUrl").and.returnValue(Promise.resolve<boolean>(true));
    const comp = fixture.componentInstance;

    const activatedRoute = fixture.debugElement.injector.get(
      ActivatedRoute
    ) as any;
    activatedRoute.testParamMap = {};
  });

  it("componente foi criado", async(() => {
    const fixture = TestBed.createComponent(RestauranteComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it("deve possuir o título RESTAURANTE", async(() => {
    const fixture = TestBed.createComponent(RestauranteComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.titulo).toEqual("RESTAURANTE");
  }));

  it("deve renderizar o titulo em um span", async(() => {
    const fixture = TestBed.createComponent(RestauranteComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector(".titulo-secao").textContent).toContain(
      fixture.componentInstance.titulo
    );
  }));

  it("quando não for edição, manter id nulo", async(() => {
    const fixture = TestBed.createComponent(RestauranteComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.idRestaurante).toBeNull();
  }));

  it("quando for edição, buscar o id dos parametros", async(() => {
    const fixture = TestBed.createComponent(RestauranteComponent);
    const rota = TestBed.get(ActivatedRoute);
    rota.testParamMap = { id: "01" };

    fixture.detectChanges();

    expect(fixture.componentInstance.idRestaurante).toBe("01");
  }));

  it("quando for edição, buscar o restaurante corretamente", async(() => {
    const servico = TestBed.get(ServicoRestaurantes);
    const restauranteARetornar: Restaurante = {
      id: "1",
      nome: "Restaurante A"
    };
    const spyBusca = spyOn(servico, "buscaRestaurante").and.returnValue(
      Observable.of<Restaurante>(restauranteARetornar)
    );
    const fixture = TestBed.createComponent(RestauranteComponent);
    const rota = TestBed.get(ActivatedRoute);
    rota.testParamMap = { id: "01" };

    fixture.detectChanges();

    expect(fixture.componentInstance.restaurante).toEqual(restauranteARetornar);
  }));

  it("quando não for edição, inicia um novo restaurante", async(() => {
    const servico = TestBed.get(ServicoRestaurantes);
    const restauranteARetornar = new Restaurante();

    const fixture = TestBed.createComponent(RestauranteComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.restaurante).toEqual(restauranteARetornar);
  }));

  it("deve possuir um botão cancelar para voltar à lista de restaurantes", () => {
    const fixture = TestBed.createComponent(RestauranteComponent);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    //Verifica a quantidade de linhas
    const ancoraCancelar = compiled.querySelector("a.botao-cancelar");
    expect(ancoraCancelar).toBeTruthy();
    expect(ancoraCancelar.getAttribute("routerlink")).toBe("/restaurantes");
  });

  it("deve possuir um campo input para informar o nome do restaurante", fakeAsync(() => {
    const fixture = TestBed.createComponent(RestauranteComponent);
    const inputNome = fixture.debugElement.query(By.css("[name^='nome']"));
    expect(inputNome).toBeTruthy();
    const el = inputNome.nativeElement;

    fixture.detectChanges();
    tick();
    expect(fixture.componentInstance.restaurante.nome).toBeFalsy();

    fixture.componentInstance.restaurante.nome = "nomeantigo";
    fixture.detectChanges();
    tick();

    expect(el.value).toEqual("nomeantigo");

    el.value = "novonome";
    el.dispatchEvent(new Event("input"));
    tick();

    expect(fixture.componentInstance.restaurante.nome).toBe("novonome");
  }));

  it("deve possuir um botão salvar para gravar as alterações", () => {
    const fixture = TestBed.createComponent(RestauranteComponent);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    //Verifica a quantidade de linhas
    const botaoSalvar = compiled.querySelector("button.botao-salvar");
    expect(botaoSalvar).toBeTruthy();
  });

  it("ao clicar no botão Salvar, o método no componente é acionado corretamente", async(() => {
    const fixture = TestBed.createComponent(RestauranteComponent);
    fixture.detectChanges();

    // const compiled = fixture.debugElement.nativeElement;
    const spyOnClick = spyOn(fixture.componentInstance, "salvarRestaurante");
    const botaoExcluir = fixture.debugElement.query(
      By.css("button.botao-salvar")
    );

    expect(fixture.componentInstance.salvarRestaurante).not.toHaveBeenCalled();
    botaoExcluir.triggerEventHandler("click", null);
    expect(fixture.componentInstance.salvarRestaurante).toHaveBeenCalled();
  }));

  it("o método salvarRestaurante aciona o método correto do serviço", async(() => {
    const servico = TestBed.get(ServicoRestaurantes);
    const restauranteTeste: Restaurante = { id: null, nome: "Restaurante A" };
    const restauranteARetornar: Restaurante = {
      id: "1",
      nome: "Restaurante A"
    };
    const spySalvar = spyOn(servico, "salvarRestaurante").and.returnValue(
      Observable.of<Restaurante>(restauranteARetornar)
    );

    const fixture = TestBed.createComponent(RestauranteComponent);
    fixture.detectChanges();

    expect(spySalvar).not.toHaveBeenCalled();
    fixture.componentInstance.restaurante = restauranteTeste;
    fixture.componentInstance.salvarRestaurante();
    expect(spySalvar).toHaveBeenCalledWith(restauranteTeste);
  }));

  it("o método salvarRestaurante navega novamente para a lista de restaurantes", async(() => {

    const fixture = TestBed.createComponent(RestauranteComponent);
    fixture.detectChanges();

    expect(spyRouter).not.toHaveBeenCalled();
    fixture.componentInstance.salvarRestaurante();
    expect(spyRouter).toHaveBeenCalledWith("/restaurantes");
  }));
});
