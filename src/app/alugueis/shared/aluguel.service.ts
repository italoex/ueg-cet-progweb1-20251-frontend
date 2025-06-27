import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { AlugueisService as ApiAlugueisService } from '../../api/services';
import { Aluguel } from '../../api/models';

@Injectable({
  providedIn: 'root'
})
export class AluguelService {

  constructor(private apiService: ApiAlugueisService) { }

  getAlugueis(): Observable<Aluguel[]> {
    return this.apiService.apiAlugueisGet$Response().pipe(map(response => response.body as Aluguel[]));
  }

  getAluguel(id: number): Observable<Aluguel> {
    return this.apiService.apiAlugueisIdGet$Response({ id }).pipe(map(response => response.body as Aluguel));
  }

  addAluguel(aluguel: Aluguel): Observable<any> {
    const body = {
      modeloMoto: aluguel.modeloMoto!,
      nomeCliente: aluguel.nomeCliente!
    };
    return this.apiService.apiAlugueisPost({ body });
  }

  updateAluguel(id: number, aluguel: Aluguel): Observable<any> {
    return this.apiService.apiAlugueisIdPut({ id, body: aluguel });
  }

  removeAluguel(id: number): Observable<any> {
    return this.apiService.apiAlugueisIdDelete({ id });
  }

  finalizarAluguel(id: number): Observable<any> {
    return this.apiService.apiAlugueisIdFinalizarPatch({ id });
  }
}
