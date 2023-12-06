export class PurchaseStatistics {
  total_purchase_value: number;
  average_score: number;
  average_price: number;
  total_reserved_seats: number;
  average_duration: number;
  purchase_product_count: PurchaseProductCount[];
  function_count_per_movie: FunctionCountPerMovie[];
  purchase_count_per_client: PurchaseCountPerClient[];

  constructor(jsonData: any) {
    this.total_purchase_value = jsonData.total_purchase_value;
    this.average_score = jsonData.average_score;
    this.average_price = jsonData.average_price;
    this.total_reserved_seats = jsonData.total_reserved_seats;
    this.average_duration = jsonData.average_duration;
    this.purchase_product_count = jsonData.purchase_product_count.map(
      (item: any) => new PurchaseProductCount(item.pk_id, item.product_count)
    );
    this.function_count_per_movie = jsonData.function_count_per_movie.map(
      (item: any) => new FunctionCountPerMovie(item.fk_movie, item.function_count)
    );
    this.purchase_count_per_client = jsonData.purchase_count_per_client.map(
      (item: any) => new PurchaseCountPerClient(item.fk_client, item.purchase_count)
    );
  }
}

export class PurchaseProductCount {
  pk_id: number;
  product_count: number;

  constructor(pk_id: number, product_count: number) {
    this.pk_id = pk_id;
    this.product_count = product_count;
  }
}

export class FunctionCountPerMovie {
  fk_movie: number;
  function_count: number;

  constructor(fk_movie: number, function_count: number) {
    this.fk_movie = fk_movie;
    this.function_count = function_count;
  }
}

export class PurchaseCountPerClient {
  fk_client: number;
  purchase_count: number;

  constructor(fk_client: number, purchase_count: number) {
    this.fk_client = fk_client;
    this.purchase_count = purchase_count;
  }
}