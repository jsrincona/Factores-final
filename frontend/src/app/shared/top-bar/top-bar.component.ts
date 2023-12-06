import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  items: MenuItem[];
  materia:String = environment.materia;
  proyecto:String = environment.proyecto;
  public href: string = "";

  constructor(private router: Router) {}

  ngOnInit() {
    this.href = this.router.url.includes("admin")? '/admin':'/app';
    this.items = [
      {
        icon: 'pi pi-fw pi-user',
        label: 'Mi perfil',
        routerLink: [this.href+'/mi-perfil']
      },
      {
        icon: 'pi pi-fw pi-cog',
        label: 'Conf. avan.',
        url: environment.server
      },
      {
        icon: 'pi pi-fw pi-times',
        label: 'salir',
        routerLink: ['/inicio']
      },
    ];
  }

}
