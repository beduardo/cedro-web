import { TestBed, getTestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { ServicoRestaurantes } from "./restaurantes.service";
import { Restaurante } from "./restaurante.model";
import { environment } from "../../environments/environment";

describe("ServicoRestaurantes", () => {
  let injector: TestBed;
  let servico: ServicoRestaurantes;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServicoRestaurantes]
    });
    injector = getTestBed();
    servico = injector.get(ServicoRestaurantes);
    httpMock = injector.get(HttpTestingController);
  });

  describe("buscarRestaurante", () => {
    it("deve retornar um Observable<Restaurante>", () => {
      const restauranteARetornar: Restaurante = {
        id: "1",
        nome: "Restaurante A"
      };

      servico.buscaRestaurante("001").subscribe(restaurante => {
        expect(restaurante).toEqual(restauranteARetornar);
      });

      const req = httpMock.expectOne(
        `${environment.baseApi}/api/restaurantes/001`
      );
      expect(req.request.method).toBe("GET");
      req.flush(restauranteARetornar);
      httpMock.verify();
    });
  });

  describe("buscarRestaurantes", () => {
    it("deve retornar um Observable<Restaurante[]>", () => {
      const restaurantesARetornar: Restaurante[] = [
        { id: "1", nome: "Restaurante A" },
        { id: "2", nome: "Restaurante B" },
        { id: "3", nome: "Restaurante C" },
        { id: "4", nome: "Restaurante D" }
      ];

      servico.buscarRestaurantes(null).subscribe(restaurantes => {
        expect(restaurantes.length).toBe(4);
        expect(restaurantes).toEqual(restaurantesARetornar);
      });

      const req = httpMock.expectOne(`${environment.baseApi}/api/restaurantes`);
      expect(req.request.method).toBe("GET");
      req.flush(restaurantesARetornar);
      httpMock.verify();
    });

    it("deve enviar o filtro para a api corretamente", () => {
      servico
        .buscarRestaurantes("teste de parametros")
        .subscribe(restaurantes => {
          expect(restaurantes.length).toBe(0);
        });

      const req = httpMock.expectOne(
        `${environment.baseApi}/api/restaurantes?filtro=teste+de+parametros`
      );

      expect(req.request.method).toBe("GET");
      req.flush([]);
      httpMock.verify();
    });
  });

  describe("excluirRestaurante", () => {
    it("Deve disparar o DELETE na url correta", () => {
      const restauranteAApagar: Restaurante = { id: "1", nome: "Teste" };
      servico.excluirRestaurante(restauranteAApagar).subscribe(() => {});
      const req = httpMock.expectOne(
        `${environment.baseApi}/api/restaurantes/1`
      );
      expect(req.request.method).toBe("DELETE");
      req.flush({});
      httpMock.verify();
    });
  });

  describe("salvarRestaurante", () => {
    it("Deve disparar o POST na url correta quando restaurante não possuir id", () => {
      const restauranteARetornar: Restaurante = {
        id: "1",
        nome: "novo-restaurante"
      };

      const restauranteACriar: Restaurante = {
        id: null,
        nome: "novo-restaurante"
      };

      servico.salvarRestaurante(restauranteACriar).subscribe(rest => {
        expect(rest).toEqual(restauranteARetornar);
      });

      const req = httpMock.expectOne(`${environment.baseApi}/api/restaurantes`);
      expect(req.request.method).toBe("POST");
      expect(req.request.body).toEqual(restauranteACriar);
      req.flush(restauranteARetornar);
      httpMock.verify();
    });

    it("Deve disparar o PUT na url correta quando restaurante possuir id", () => {
      const restauranteARetornar: Restaurante = {
        id: "1",
        nome: "restaurante-alterado-b"
      };

      const restauranteAAlterar: Restaurante = {
        id: "1",
        nome: "restaurante-alterado"
      };

      servico.salvarRestaurante(restauranteAAlterar).subscribe(rest => {
        expect(rest).toEqual(restauranteARetornar);
      });

      const req = httpMock.expectOne(`${environment.baseApi}/api/restaurantes`);
      expect(req.request.method).toBe("PUT");
      expect(req.request.body).toEqual(restauranteAAlterar);
      req.flush(restauranteARetornar);
      httpMock.verify();
    });
  });
});
