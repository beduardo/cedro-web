import { Restaurante } from "./restaurante.model";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable()
export class ServicoRestaurantes {
  constructor(private http: HttpClient) {}

  buscaRestaurante(id: string): Observable<Restaurante> {
    const url = `${environment.baseApi}/api/restaurantes/${id}`;
    return this.http.get<Restaurante>(url);
  }

  buscarRestaurantes(filtro: string): Observable<Restaurante[]> {
    let parametros: HttpParams;
    if (filtro) {
      const filtroAjustado = filtro.replace(/ /g, "+");
      parametros = new HttpParams().set("filtro", filtroAjustado);
    }
    return this.http.get<Restaurante[]>(
      `${environment.baseApi}/api/restaurantes`,
      {
        params: parametros
      }
    );
  }

  excluirRestaurante(restaurante: Restaurante): Observable<any> {
    return this.http.delete<any>(
      `${environment.baseApi}/api/restaurantes/${restaurante.id}`
    );
  }

  salvarRestaurante(restaurante: Restaurante): Observable<Restaurante> {
    if (restaurante.id) {
      return this.http.put<Restaurante>(
        `${environment.baseApi}/api/restaurantes`,
        restaurante
      );
    } else {
      return this.http.post<Restaurante>(
        `${environment.baseApi}/api/restaurantes`,
        restaurante
      );
    }
  }
}
