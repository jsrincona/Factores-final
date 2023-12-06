import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '@models/products/products.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  headers = new HttpHeaders();

  constructor(
    private http: HttpClient
  ) { 
    this.headers = this.headers.append("Content-Type", "application/json");
  }

  getTickets():Observable<Ticket[]>{
    return this.http.get<Ticket[]>(
      environment.api + 'product/ticket/',
      {headers: this.headers}
    )
  }
  getTicket(id:number):Observable<Ticket>{
    return this.http.get<Ticket>(
      environment.api + 'product/ticket/'+id+'/',
      {headers: this.headers}
    )
  }
  
  setTicket(ticket: Ticket):Observable<Ticket> {
    var body = JSON.stringify({
      "t_name":ticket.t_name ,
      "t_description": ticket.t_description,
      "n_price": ticket.n_price,
      "b_state": false

  });
    return this.http.post<Ticket>(
      environment.api + 'product/ticket/',
      body,
      {headers: this.headers}
    )
  }
  updateTicket(ticket: Ticket):Observable<Ticket> {
    var body = JSON.stringify({
      "t_name":ticket.t_name ,
      "t_description": ticket.t_description,
      "n_price": ticket.n_price,
      "b_state": ticket.b_state
  });
    return this.http.patch<Ticket>(
      environment.api + 'product/ticket/'+ ticket.pk_id +'/',
      body,
      {headers: this.headers}
    )
  }
  deleteTicket(ticket: Ticket):Observable<any> {

    return this.http.delete(
      environment.api + 'product/ticket/'+ ticket.pk_id +'/',
      {headers: this.headers}
    )
  }

}
