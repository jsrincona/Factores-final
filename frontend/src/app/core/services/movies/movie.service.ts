import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '@models/movies/movies.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  headers = new HttpHeaders();

  constructor(
    private http: HttpClient
  ) { 
    this.headers = this.headers.append("Content-Type", "application/json");
  }

  getMovies():Observable<Movie[]> {
    return this.http.get<Movie[]>(
      environment.api+"movie/",
      {headers: this.headers}
    )
  }
  getMovie(id:number):Observable<Movie>{
    return this.http.get<Movie>(
      environment.api + 'movie/'+id +"/",
      {headers: this.headers}
    )
  }

  setMovie(movie: Movie):Observable<Movie> {
    var body = JSON.stringify({
      "t_genre": movie.t_genre ,
      "n_rating": movie.n_rating ,
      "t_description": movie.t_description ,
      "t_title": movie.t_title ,
      "n_duration": movie.n_duration 
  });
    return this.http.post<Movie>(
      environment.api + 'movie/',
      body,
      {headers: this.headers}
    )
  }
  updateMovie(movie: Movie):Observable<Movie> {
    var body = JSON.stringify({
      "pk_id": movie.pk_id,
      "t_genre": movie.t_genre,
      "n_rating": movie.n_rating,
      "t_description": movie.t_description,
      "t_title": movie.t_title,
      "n_duration": movie.n_duration
  });
    return this.http.patch<Movie>(
      environment.api + 'movie/'+movie.pk_id +'/',
      body,
      {headers: this.headers}
    )
  }
  deleteMovie(movie: Movie):Observable<any> {
    
    return this.http.delete(
      environment.api + 'movie/'+movie.pk_id +'/',
      {headers: this.headers}
    )
  }
}
