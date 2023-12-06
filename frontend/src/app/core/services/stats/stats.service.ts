import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  headers = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { 
    this.headers = this.headers.append("Content-Type", "application/json");
  }

  getStats():Observable<any>{
    return this.http.get<any>(
      environment.api + 'stats/',
      {headers: this.headers}
    )
  }
}
