import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cinema } from '@models/cinema/cinema.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  
  constructor(private http : HttpClient){ }

  getCinemas():Observable<Cinema[]> {
    return this.http.get<Cinema[]>(environment.api+'cinema/')
  }
}
