import { Restaurante } from "./restaurante.model";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

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
      return this.http
        .put<Restaurante>(
          `${environment.baseApi}/api/restaurantes`,
          restaurante
        )
        .pipe(catchError(this.tratarErro));
    } else {
      return this.http
        .post<Restaurante>(
          `${environment.baseApi}/api/restaurantes`,
          restaurante
        )
        .pipe(catchError(this.tratarErro));
    }
  }

  private tratarErro(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("Um erro ocorreu:", error.error.message);
    } else {
      console.error(
        `Backend retornou o códgio ${error.status}, ` + `com o body: ${error.error}`
      );
    }
    return new ErrorObservable(
      "Um erro ocorreu. Verifique os campos obrigatórios e tente novamente"
    );
  }
}
