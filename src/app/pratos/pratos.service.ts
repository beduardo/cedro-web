import { Observable } from "rxjs/Observable";
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Prato } from "./prato.model";
import { catchError } from "rxjs/operators";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

@Injectable()
export class ServicoPratos {
  constructor(private http: HttpClient) {}

  buscarPrato(id: string): Observable<Prato> {
    const url = `${environment.baseApi}/api/pratos/${id}`;
    return this.http.get<Prato>(url);
  }

  buscarPratos(): Observable<Prato[]> {
    let parametros: HttpParams;
    return this.http.get<Prato[]>(`${environment.baseApi}/api/pratos`, {
      params: parametros
    });
  }

  excluirPrato(prato: Prato): Observable<any> {
    return this.http.delete<any>(
      `${environment.baseApi}/api/pratos/${prato.id}`
    );
  }

  salvarPrato(prato: Prato): Observable<Prato> {
    if (prato.id) {
      return this.http
        .put<Prato>(`${environment.baseApi}/api/pratos`, prato)
        .pipe(catchError(this.tratarErro));
    } else {
      return this.http
        .post<Prato>(`${environment.baseApi}/api/pratos`, prato)
        .pipe(catchError(this.tratarErro));
    }
  }

  private tratarErro(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("Um erro ocorreu:", error.error.message);
    } else {
      console.error(
        `Backend retornou o códgio ${error.status}, ` +
          `com o body: ${error.error}`
      );
    }
    return new ErrorObservable(
      "Um erro ocorreu. Verifique os campos obrigatórios e tente novamente"
    );
  }
}
