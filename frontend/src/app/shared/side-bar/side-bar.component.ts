import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent{
  username = localStorage.getItem("username")? localStorage.getItem("username"):'Loading...';
  role = localStorage.getItem("role")? localStorage.getItem("role"):'N/A';
  public href: string = "";
  api = environment.api;
  server = environment.server;
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.href = this.router.url.includes("admin")? '/admin':'/app';
  }

  isAllowed(route):boolean{
    if(this.role == 'Administrador' || this.role == 'Administrador Administrador'){
      return true
    }else{
      if(this.role == 'Empleado' && (route == 'mi-perfil' || route == 'mi-inventario' || route == 'mis-compras' || route == 'mi-cine')){
        return true
      }else{
        if(this.role == 'Cliente' && (route == 'mi-perfil' || route == 'mis-compras')){
          return true
        }else{
          return false
        }
      }
    }
  }
}
