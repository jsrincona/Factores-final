import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthService } from '../services/users/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  constructor(
    private authSvc: AuthService, 
    private router: Router,
    private messageService: MessageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const allowedRoles = route.data["allowedRoles"];
      const isAuthorized = this.authSvc.isAuthorized(allowedRoles);
  
      if (!isAuthorized) {
        this.router.navigate(['/no-encontrado']);
        this.messageService.add({key:'grl-toast', severity:'error', summary:'Sin permisos', detail:'No esta autorizado para ingresar'});
      }
  
      return isAuthorized;
  }  
}
