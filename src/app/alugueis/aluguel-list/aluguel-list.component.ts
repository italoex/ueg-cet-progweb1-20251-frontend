import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Aluguel } from '../../api/models';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AluguelService } from '../shared/aluguel.service';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-aluguel-list',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatTableModule, MatCardModule,
    MatButtonModule, MatIconModule, MatTooltipModule, MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './aluguel-list.component.html',
  styleUrls: ['./aluguel-list.component.scss']
})
export class AluguelListComponent implements OnInit {
  dataSource = new MatTableDataSource<Aluguel>();
  isLoading = true;
  displayedColumns: string[] = ['modeloMoto', 'nomeCliente', 'dataRetirada', 'status', 'actions'];

  constructor(private aluguelService: AluguelService) {}

  ngOnInit(): void {
    this.loadAlugueis();
  }

  loadAlugueis(): void {
    this.isLoading = true;
    this.aluguelService.getAlugueis().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar aluguéis', err);
        this.isLoading = false;
      }
    });
  }

  finalizarAluguel(aluguel: Aluguel): void {
    if (aluguel.id) {
      this.aluguelService.finalizarAluguel(aluguel.id).subscribe(() => this.loadAlugueis());
    }
  }

  remover(aluguel: Aluguel): void {
    if (aluguel.id) {
      this.aluguelService.removeAluguel(aluguel.id).subscribe(() => this.loadAlugueis());
    }
  }
}
