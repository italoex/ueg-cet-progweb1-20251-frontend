import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Aluguel } from '../shared/aluguel';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AluguelService } from '../shared/aluguel.service';
import { CommonModule } from '@angular/common';

// Imports do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips'; // <-- ADICIONE ESTA LINHA

@Component({
  selector: 'app-aluguel-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule // <-- E ADICIONE AQUI
  ],
  templateUrl: './aluguel-list.component.html',
  styleUrls: ['./aluguel-list.component.scss']
})
export class AluguelListComponent {
  dataSource = new MatTableDataSource<Aluguel>();

  constructor(private aluguelService: AluguelService) {
    this.updateTable();
  }

  displayedColumns: string[] = ['modeloMoto', 'nomeCliente', 'dataRetirada', 'status', 'actions'];

  finalizarAluguel(aluguel: Aluguel): void {
    this.aluguelService.finalizarAluguel(aluguel);
    this.updateTable();
  }

  remover(aluguel: Aluguel) {
    this.aluguelService.removeAluguel(aluguel.id ?? 0);
    this.updateTable();
  }

  private updateTable() {
    this.dataSource.data = this.aluguelService.getAlugueis();
  }
}
