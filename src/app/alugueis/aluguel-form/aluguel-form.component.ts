import { Component, OnInit } from '@angular/core';
import { AluguelService } from '../shared/aluguel.service';
import { Aluguel } from '../../api/models';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-aluguel-form',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule
  ],
  templateUrl: './aluguel-form.component.html',
  styleUrls: ['./aluguel-form.component.scss']
})
export class AluguelFormComponent implements OnInit {
  aluguel: Aluguel = {};
  title: string = 'Novo Aluguel';
  isEditing = false;

  constructor(
    private aluguelService: AluguelService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditing = true;
      const id = parseInt(idParam, 10);
      this.title = 'Editar Aluguel';
      this.aluguelService.getAluguel(id).subscribe(data => this.aluguel = data);
    }
  }

  save(): void {
    const action = this.isEditing && this.aluguel.id
      ? this.aluguelService.updateAluguel(this.aluguel.id, this.aluguel)
      : this.aluguelService.addAluguel(this.aluguel);

    action.subscribe({
      next: () => this.navigateToHome(),
      error: (err) => console.error('Erro ao salvar aluguel', err)
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
