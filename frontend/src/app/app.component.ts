import { Component } from '@angular/core';
import { Cinema } from '@models/cinema/cinema.model';
import { CinemaService } from '@services/cinema/cinema.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  listMultiplex:Cinema[] = [];
  isClicked:boolean = false;
  
  constructor(
    private messageService: MessageService,
    private cinemaService: CinemaService
  ) {}
  
  ngOnInit() {
    this.cinemaService.getCinemas().subscribe(
    (cinemas:Cinema[])=>{
      this.listMultiplex = cinemas;
    }
    )
  }
  saveMultiplexId(multiplex_id: number) {
    localStorage.setItem("multiplex", String(multiplex_id));
  }
}
