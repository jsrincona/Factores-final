import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Show } from '@models/shows/show.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  headers = new HttpHeaders();

  constructor(
    private http: HttpClient
  ) { 
    this.headers = this.headers.append("Content-Type", "application/json");
  }

  getShows():Observable<Show[]>{
    return this.http.get<Show[]>(
      environment.api + 'function/',
      {headers: this.headers}
    )
  }

  setShow(show: Show):Observable<Show> {
    var body = JSON.stringify({
      "d_date": show.d_date,
      "d_start_time": show.d_start_time,
      "d_end_time": show.d_end_time,
      "fk_movie": show.fk_movie,
      "fk_hall": show.fk_hall
  });
    return this.http.post<Show>(
      environment.api + 'function/',
      body,
      {headers: this.headers}
    )
  }
  updateShow(show: Show):Observable<Show> {
    var body = JSON.stringify({
      "pk_id": show.pk_id,
      "d_date": show.d_date,
      "d_start_time": show.d_start_time,
      "d_end_time": show.d_end_time,
      "fk_movie": show.fk_movie,
      "fk_hall": show.fk_hall
  });
    return this.http.patch<Show>(
      environment.api + 'function/'+show.pk_id +'/',
      body,
      {headers: this.headers}
    )
  }
  deleteShow(show: Show):Observable<any> {
    
    return this.http.delete(
      environment.api + 'function/'+show.pk_id +'/',
      {headers: this.headers}
    )
  }

}
