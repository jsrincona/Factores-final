import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seat } from '@models/seats/seat.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  headers = new HttpHeaders();

  constructor(
    private http: HttpClient
  ) { 
    this.headers = this.headers.append("Content-Type", "application/json");
  }

  getSeats():Observable<Seat[]>{
    return this.http.get<Seat[]>(
      environment.api + 'seat/',
      {headers: this.headers}
    )
  }
  getSeat(id:number):Observable<Seat>{
    return this.http.get<Seat>(
      environment.api + 'seat/'+id+'/',
      {headers: this.headers}
    )
  }
  updateSeat(seat:Seat):Observable<Seat>{
    return this.http.patch<Seat>(
      environment.api + 'seat/'+seat.pk_id+'/',
      {headers: this.headers}
    )
  }
}
