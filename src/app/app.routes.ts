import { Routes } from '@angular/router';
import { AluguelListComponent } from './alugueis/aluguel-list/aluguel-list.component';
import { AluguelFormComponent } from './alugueis/aluguel-form/aluguel-form.component';

export const routes: Routes = [
  { path: '', component: AluguelListComponent },
  { path: 'aluguel', component: AluguelFormComponent },
  { path: 'aluguel/:id', component: AluguelFormComponent }
];
