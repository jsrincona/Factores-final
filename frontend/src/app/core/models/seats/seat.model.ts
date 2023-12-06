export class Seat {
  pk_id: number;
  t_type: string;
  b_state: boolean;
  fk_ticket: any;
  fk_hall: number;
  row?:number;
  column?:number;
}
