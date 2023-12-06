import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { TokenModel } from '../../models/users/token.model';

const opciones = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.onClean();
  }

  onClean(): void{
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.clear();
  }

  onLogin(correo: string, pass: string):Observable<TokenModel> {
    const body = JSON.stringify({'username':correo, "password":pass});
    return this.http.post<TokenModel>(
      environment.api + 'auth/generate_token/',
      body,
      opciones
    );
  }

  isAuthorized(allowedRoles: string[]): boolean {
    if (allowedRoles == null || allowedRoles.length == 0) {
      return true;
    }

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      return false;
    }

    return allowedRoles.includes(role);
  }
  
}
