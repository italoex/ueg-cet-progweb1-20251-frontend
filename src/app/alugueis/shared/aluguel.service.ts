import { Injectable } from '@angular/core';
import { Aluguel } from './aluguel';

@Injectable({
  providedIn: 'root'
})
export class AluguelService {
  alugueis!: Aluguel[];

  constructor() {
    this.initAlugueis();
  }

  private initAlugueis() {
    this.alugueis = [
      { id: 1, modeloMoto: 'Honda CB 500F', nomeCliente: 'João da Silva', dataRetirada: new Date('2025-07-10'), concluido: false },
      { id: 2, modeloMoto: 'Yamaha MT-07', nomeCliente: 'Maria Oliveira', dataRetirada: new Date('2025-07-12'), concluido: true, dataDevolucao: new Date('2025-07-15'), valorTotal: 450 },
      { id: 3, modeloMoto: 'Kawasaki Z400', nomeCliente: 'Pedro Martins', dataRetirada: new Date('2025-07-15'), concluido: false },
      { id: 4, modeloMoto: 'BMW G 310 R', nomeCliente: 'Ana Souza', dataRetirada: new Date('2025-07-18'), concluido: false },
    ];
  }

  getAlugueis() {
    return this.alugueis;
  }

  getAluguel(id: number) {
    return this.alugueis.find(aluguel => aluguel.id === id);
  }

  addAluguel(aluguel: Aluguel) {
    let length = this.alugueis.length ?? 0;
    let lastAluguel = this.alugueis[length - 1];
    aluguel.id = (lastAluguel?.id ?? 0) + 1;
    aluguel.concluido = false;
    this.alugueis.push(aluguel);
  }

  removeAluguel(id: number) {
    this.alugueis = this.alugueis.filter(aluguel => aluguel.id !== id);
  }

  updateAluguel(aluguel: Aluguel) {
    const aluguelDb = this.getAluguel(aluguel.id ?? 0);
    if (aluguelDb) {
      aluguelDb.modeloMoto = aluguel.modeloMoto;
      aluguelDb.nomeCliente = aluguel.nomeCliente;
      aluguelDb.dataRetirada = aluguel.dataRetirada;
      aluguelDb.dataDevolucao = aluguel.dataDevolucao;
      aluguelDb.valorTotal = aluguel.valorTotal;
      aluguelDb.concluido = aluguel.concluido;
    }
  }

  finalizarAluguel(aluguel: Aluguel) {
    const aluguelDb = this.getAluguel(aluguel.id ?? 0);
    if (aluguelDb) {
      aluguelDb.concluido = true;
      aluguelDb.dataDevolucao = new Date(); // Define a data de devolução como a data atual
      // Lógica para cálculo do valor total pode ser adicionada aqui
      aluguelDb.valorTotal = 150; // Exemplo de valor fixo
    }
  }
}
