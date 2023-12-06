import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/users/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLogoutGuard implements CanActivate {

  constructor(
    private authSvc:AuthService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authSvc.onClean();
    return localStorage.getItem("role")?false:true;
  }
  
}
