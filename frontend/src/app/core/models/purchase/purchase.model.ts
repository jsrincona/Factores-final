import { Hall } from "@models/hall/hall.model";
import { Movie } from "@models/movies/movies.model";
import { Snack } from "@models/products/products.model";
import { Seat } from "@models/seats/seat.model";
import { Show } from "@models/shows/show.model";

class Booking {
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
}

export interface Purchase {
  client_id : number;
  seats_ids : number[];
  snacks_ids: number[];
}

export class BookingAdapter {
  static adapt(booking: Booking): Purchase {
    const purchase: Purchase = {
      client_id: 0,
      seats_ids: [],
      snacks_ids: [],
    };

    purchase.client_id = Number(localStorage.getItem('id'));
    purchase.seats_ids = booking.seats.map(seat => seat.pk_id);
    purchase.snacks_ids = booking.snacks.map(snack => snack.pk_id);

    return purchase;
  }
}