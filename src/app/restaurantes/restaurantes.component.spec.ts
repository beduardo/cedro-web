import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "../material.module";
import { RestaurantesComponent } from "./restaurantes.component";
import { ServicoRestaurantes } from "./restaurantes.service";
import "rxjs/add/observable/of";
import { Observable } from "rxjs/Observable";
import { Restaurante } from "./restaurante.model";

let servicoRestaurantesStub: Partial<ServicoRestaurantes>;

describe("RestauranteComponent", () => {
  beforeEach(async(() => {
    servicoRestaurantesStub = {
      buscarRestaurantes: (filtro: string) => Observable.of<Restaurante[]>()
    };

    TestBed.configureTestingModule({
      imports: [MaterialModule],
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
    const spyBusca = spyOn(servico, "buscarRestaurantes").and.returnValues(
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
});
