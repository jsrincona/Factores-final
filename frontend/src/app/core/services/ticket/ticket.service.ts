import { Injectable } from '@angular/core';
import { Hall } from '@models/hall/hall.model';
import { Movie } from '@models/movies/movies.model';
import { Snack } from '@models/products/products.model';
import { Seat } from '@models/seats/seat.model';
import { Show } from '@models/shows/show.model';
import { Subject } from 'rxjs';
import { BookingAdapter, Purchase } from '../../models/purchase/purchase.model';
import { PurchaseService } from '../purchase/purchase.service';

@Injectable({
  providedIn: 'root'
})

export class Booking {
  seats: Seat[];
  show: Show;
  hall:Hall;
  snacks: Snack[];
  movie: Movie;
  paymentInformation: {
    cardholderName: string;
    cardholderNumber: string;
    date: string;
    cvv: string;
    remember: boolean;
  };

  constructor() {}
}

export class TicketService {

  constructor(){}

  ticketInformation : Booking = {
    seats: [],
    show : null,
    hall : null,
    snacks: [],
    movie: null,
    paymentInformation: {
      cardholderName: "",
      cardholderNumber: "",
      date: "",
      cvv: "",
      remember: false,
    },
  };

  private paymentComplete = new Subject<any>();

  paymentComplete$ = this.paymentComplete.asObservable();

  getTicketInformation() {
    return this.ticketInformation;
  }

  setTicketInformation(ticketInformation) {
    this.ticketInformation = ticketInformation;
  }

  complete():boolean {
    this.paymentComplete.next(this.ticketInformation);
    console.log(this.ticketInformation);
    return true;
  }
}
