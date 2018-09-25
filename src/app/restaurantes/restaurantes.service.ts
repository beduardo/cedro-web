import { Restaurante } from "./restaurante.model";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable()
export class ServicoRestaurantes {
  constructor(private http: HttpClient) {}

  buscarRestaurantes(filtro: string): Observable<Restaurante[]> {
    let parametros: HttpParams;
    if (filtro) {
      const filtroAjustado = filtro.replace(/ /g, "+");
      parametros = new HttpParams().set("filtro", filtroAjustado);
    }
    return this.http.get<Restaurante[]>(`${environment.baseApi}/api/restaurantes`, {
      params: parametros
    });
  }
}
