export class Product {
  pk_id : number;
  t_name : string;
  t_description : string;
  n_price : number;
}

export class Snack extends Product {
  n_stock : number;
  t_type : string;
}

export class Ticket extends Product {
  d_creation : Date;
  b_state : boolean;
}

export const proto_prod_gnr:Product = {
  "pk_id": 0,
  "t_name": "",
  "t_description": "",
  "n_price": 0
}

export const proto_prod_snack:Snack = {
  "pk_id": 0,
  "t_name": "",
  "t_description": "",
  "n_price": 0,
  "n_stock": 0,
  "t_type": ""
}

export const proto_prod_ticket:Ticket = {
  "pk_id": 0,
  "t_name": "",
  "t_description": "",
  "n_price": 0,
  "d_creation": new Date("2023-07-08T00:00:00.000Z"),
  "b_state": true
}
