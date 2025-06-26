import { Component, OnInit } from '@angular/core';
import { AluguelService } from '../shared/aluguel.service';
import { Aluguel } from '../shared/aluguel';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necessário para ngModel

// Imports do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-aluguel-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, // Import do FormsModule
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './aluguel-form.component.html',
  styleUrls: ['./aluguel-form.component.scss']
})
export class AluguelFormComponent implements OnInit {
  aluguel: Aluguel = new Aluguel();
  title: string = 'Novo Aluguel';

  constructor(
    private aluguelService: AluguelService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      const foundAluguel = this.aluguelService.getAluguel(parseInt(id, 10));
      if (foundAluguel) {
        this.aluguel = foundAluguel;
        this.title = 'Editar Aluguel';
      }
    }
  }

  save() {
    if (this.aluguel.id) {
      this.aluguelService.updateAluguel(this.aluguel);
    } else {
      this.aluguelService.addAluguel(this.aluguel);
    }
    this.navigateToHome();
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
