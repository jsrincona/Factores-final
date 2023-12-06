import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  docs = environment.docs;
  cronograma = environment.cronograma;
  repositorio = environment.repositorio;
  me = environment.jsrincona;
  materia = environment.materia;
  proyecto = environment.proyecto;
}
