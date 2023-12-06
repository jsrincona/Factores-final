import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Snack } from '@models/products/products.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SnackService {
  
  headers = new HttpHeaders();

  constructor(
    private http: HttpClient
  ) { 
    this.headers = this.headers.append("Content-Type", "application/json");
  }

  getSnacks():Observable<Snack[]>{
    return this.http.get<Snack[]>(
      environment.api + 'product/snacks/',
      {headers: this.headers}
    )
  }
  getSnack(id:number):Observable<Snack>{
    return this.http.get<Snack>(
      environment.api + 'product/snacks/'+id+'/',
      {headers: this.headers}
    )
  }

  setSnack(snack: Snack):Observable<Snack> {
    var body = JSON.stringify({
      "t_name": snack.t_name,
      "t_description": snack.t_description,
      "n_price": snack.n_price,
      "n_stock": snack.n_stock,
      "t_type": snack.t_type
  });
    return this.http.post<Snack>(
      environment.api + 'product/snacks/',
      body,
      {headers: this.headers}
    )
  }
  updateSnack(snack: Snack):Observable<Snack> {
    var body = JSON.stringify({
      "pk_id": snack.pk_id ,
      "t_name": snack.t_name,
      "t_description": snack.t_description,
      "n_price": snack.n_price,
      "n_stock": snack.n_stock,
      "t_type": snack.t_type
  });
    return this.http.patch<Snack>(
      environment.api + 'product/snacks/'+snack.pk_id +'/',
      body,
      {headers: this.headers}
    )
  }
  deleteSnack(snack: Snack):Observable<any> {
    
    return this.http.delete(
      environment.api + 'product/snacks/'+snack.pk_id +'/',
      {headers: this.headers}
    )
  }
}
