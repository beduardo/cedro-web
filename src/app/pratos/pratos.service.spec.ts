import { TestBed, getTestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { environment } from "../../environments/environment";
import { ServicoPratos } from "./pratos.service";
import { Prato } from "./prato.model";

describe("ServicoPratos", () => {
  let injector: TestBed;
  let servico: ServicoPratos;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServicoPratos]
    });
    injector = getTestBed();
    servico = injector.get(ServicoPratos);
    httpMock = injector.get(HttpTestingController);
  });

  describe("buscarPrato", () => {
    it("deve retornar um Observable<Prato>", () => {
      const pratoARetornar: Prato = {
        id: "1",
        nome: "Prato A",
        preco: 10,
        restauranteId: "2",
        restauranteNome: "Restaurante A"
      };

      servico.buscarPrato("001").subscribe(prato => {
        expect(prato).toEqual(pratoARetornar);
      });

      const req = httpMock.expectOne(
        `${environment.baseApi}/api/pratos/001`
      );
      expect(req.request.method).toBe("GET");
      req.flush(pratoARetornar);
      httpMock.verify();
    });
  });

  describe("buscarPratos", () => {
    it("deve retornar um Observable<Prato[]>", () => {
      const pratosARetornar: Prato[] = [
        { id: "1", nome: "Prato A", preco: 10, restauranteId: "001", restauranteNome: "Restaurante A" },
        { id: "2", nome: "Prato B", preco: 12, restauranteId: "001", restauranteNome: "Restaurante A" },
        { id: "3", nome: "Prato C", preco: 14, restauranteId: "002", restauranteNome: "Restaurante B" },
        { id: "4", nome: "Prato D", preco: 16, restauranteId: "001", restauranteNome: "Restaurante A" },
      ];

      servico.buscarPratos().subscribe(pratos => {
        expect(pratos.length).toBe(4);
        expect(pratos).toEqual(pratosARetornar);
      });

      const req = httpMock.expectOne(`${environment.baseApi}/api/pratos`);
      expect(req.request.method).toBe("GET");
      req.flush(pratosARetornar);
      httpMock.verify();
    });
  });

  describe("excluirPrato", () => {
    it("Deve disparar o DELETE na url correta", () => {
      const pratoAApagar: Prato = { id: "1", nome: "Teste", preco: 10, restauranteId: "001", restauranteNome: "Restaurante A" };
      servico.excluirPrato(pratoAApagar).subscribe(() => {});
      const req = httpMock.expectOne(
        `${environment.baseApi}/api/pratos/1`
      );
      expect(req.request.method).toBe("DELETE");
      req.flush({});
      httpMock.verify();
    });
  });

  describe("salvarPrato", () => {
    it("Deve disparar o POST na url correta quando prato não possuir id", () => {
      const pratoARetornar: Prato = {
        id: "1",
        nome: "novo-prato",
        preco: 10,
        restauranteId: "001",
        restauranteNome: "Restaurante A"
      };

      const pratoACriar: Prato = {
        id: null,
        nome: "novo-prato",
        preco: 10,
        restauranteId: "001",
        restauranteNome: "Restaurante A"
      };

      servico.salvarPrato(pratoACriar).subscribe(rest => {
        expect(rest).toEqual(pratoARetornar);
      });

      const req = httpMock.expectOne(`${environment.baseApi}/api/pratos`);
      expect(req.request.method).toBe("POST");
      expect(req.request.body).toEqual(pratoACriar);
      req.flush(pratoARetornar);
      httpMock.verify();
    });

    it("Deve disparar o PUT na url correta quando prato possuir id", () => {
      const pratoARetornar: Prato = {
        id: "1",
        nome: "restaurante-alterado-b",
        preco: 10,
        restauranteId: "001",
        restauranteNome: "Restaurante A"
      };

      const pratoAAlterar: Prato = {
        id: "1",
        nome: "restaurante-alterado",
        preco: 10,
        restauranteId: "001",
        restauranteNome: "Restaurante A"
      };

      servico.salvarPrato(pratoAAlterar).subscribe(rest => {
        expect(rest).toEqual(pratoARetornar);
      });

      const req = httpMock.expectOne(`${environment.baseApi}/api/pratos`);
      expect(req.request.method).toBe("PUT");
      expect(req.request.body).toEqual(pratoAAlterar);
      req.flush(pratoARetornar);
      httpMock.verify();
    });
  });
});
