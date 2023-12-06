import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hall } from '@models/hall/hall.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HallService {
  
  headers = new HttpHeaders();

  constructor(
    private http: HttpClient
  ) { 
    this.headers = this.headers.append("Content-Type", "application/json");
  }

  getHalls():Observable<Hall[]>{
    return this.http.get<Hall[]>(
      environment.api + 'hall/',
      {headers: this.headers}
    )
  }
  getHall(id:number):Observable<Hall>{
    return this.http.get<Hall>(
      environment.api + 'hall/'+id+'/',
      {headers: this.headers}
    )
  }

  setHall(hall: Hall):Observable<Hall> {
    var body = JSON.stringify({
      "b_state": hall.b_state,
      "fk_theater": hall.fk_theater,
  });
    return this.http.post<Hall>(
      environment.api + 'hall/',
      body,
      {headers: this.headers}
    )
  }
  updateHall(hall: Hall):Observable<Hall> {
    var body = JSON.stringify({
      "pk_id": hall.pk_id ,
      "b_state": hall.b_state,
      "fk_theater": hall.fk_theater,
  });
    return this.http.patch<Hall>(
      environment.api + 'hall/'+hall.pk_id +'/',
      body,
      {headers: this.headers}
    )
  }
  deleteHall(hall: Hall):Observable<any> {
    
    return this.http.delete(
      environment.api + 'hall/'+hall.pk_id +'/',
      {headers: this.headers}
    )
  }
}
