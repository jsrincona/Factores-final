import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptorService implements HttpInterceptor {
  constructor(private msgSvc: MessageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.msgSvc.add({
      key: 'general-toast',
      severity: 'warn',
      summary: 'Cargando',
      detail: 'por favor espere ...',
      sticky: true,
    });
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.msgSvc.clear();
        }

        return event;
      })
    );
  }
}
