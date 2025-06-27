import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

import { AluguelControllerService } from '../../api/services';
import { Aluguel } from '../../api/models';

@Injectable({
  providedIn: 'root'
})
export class AluguelService {

  constructor(private apiService: AluguelControllerService) { }

  getAlugueis(): Observable<Aluguel[]> {
    return (this.apiService.getAlugueis$Response() as unknown as Observable<HttpResponse<Blob>>).pipe(
      switchMap(response => {
        return from(response.body!.text());
      }),
      map(jsonText => {
        return JSON.parse(jsonText) as Aluguel[];
      })
    );
  }

  getAluguel(id: number): Observable<Aluguel> {
    return (this.apiService.getAluguelPorId$Response({ id }) as unknown as Observable<HttpResponse<Blob>>).pipe(
      switchMap(response => from(response.body!.text())),
      map(jsonText => JSON.parse(jsonText) as Aluguel)
    );
  }

  addAluguel(aluguel: Aluguel): Observable<Aluguel> {
    const body = {
      modeloMoto: aluguel.modeloMoto,
      nomeCliente: aluguel.nomeCliente
    };
    return this.apiService.criarAluguel({ body });
  }

  updateAluguel(id: number, aluguel: Aluguel): Observable<Aluguel> {
    return this.apiService.atualizarAluguel({ id, body: aluguel });
  }

  removeAluguel(id: number): Observable<void> {
    return this.apiService.deletarAluguel({ id });
  }

  finalizarAluguel(id: number): Observable<Aluguel> {
    return this.apiService.finalizarAluguel({ id });
  }
}
