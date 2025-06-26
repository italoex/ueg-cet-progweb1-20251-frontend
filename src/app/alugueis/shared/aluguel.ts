export class Aluguel {
  id?: number;
  modeloMoto!: string;
  nomeCliente!: string;
  dataRetirada!: Date;
  dataDevolucao?: Date;
  valorTotal?: number;
  concluido: boolean = false;
}
