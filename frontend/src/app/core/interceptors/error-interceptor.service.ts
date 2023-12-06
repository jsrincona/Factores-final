import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private router: Router, private msgSvc: MessageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        const error = err.error.mensaje || err.statusText;
        if (err.status == 500) {
          this.mostrarMensaje('Error');
          this.deleteLocal();
        } else {
          this.mostrarMensaje('Error desconocido, comuníquese con el administrador del aplicativo');
        }
        return throwError(err);
      })
    );
  }

  deleteLocal() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('role');
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  mostrarMensaje(mensaje) {
    this.msgSvc.add({
      key: 'general-toast',
      severity: 'error',
      summary: 'ERROR',
      detail: mensaje,
      sticky: true,
    });
  }
}
