import { Component } from "@angular/core";
import { MenuItem, MessageService } from "primeng/api";
import { Subscription } from "rxjs";
import { TicketService } from "@services/ticket/ticket.service";
import { Purchase } from "@models/purchase/purchase.model";
import { Snack } from "@models/products/products.model";
import { PurchaseService } from "@services/purchase/purchase.service";
import { SnackService } from "@services/products/snack.service";
@Component({
  selector: "app-purchase",
  templateUrl: "./purchase.component.html",
  styleUrls: ["./purchase.component.scss"],
})
export class PurchaseComponent {
  items: MenuItem[] =  [
    {
      label: "Películas",
      routerLink: "movies",
    },
    {
      label: "Funciones",
      routerLink: "shows",
    },
    {
      label: "Salas",
      routerLink: "halls",
    },
    {
      label: "Asientos",
      routerLink: "seat",
    },
    {
      label: "Snacks",
      routerLink: "snacks",
    },
    {
      label: "Pago",
      routerLink: "payment",
    },
    {
      label: "Confirmación",
      routerLink: "confirmation",
    },
  ];;
  subscription: Subscription;
  compras: Purchase[];
  productos : Snack[];

  constructor(
    public messageService: MessageService,
    public ticketService: TicketService,
    private purchaseService : PurchaseService,
    private snackService: SnackService,
  ) {}

  ngOnInit() {
    this.subscription = this.ticketService.paymentComplete$.subscribe(
      (personalInformation) => {
        this.messageService.add({
          severity: "success",
          summary: "Compra realizada",
          detail:
            "Le informamos que: " +
              personalInformation.firstname +
            " " +
              personalInformation.lastname +
            " Su orden ha sido completada.",
        });
      }
    );
    
    this.getCompras();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getCompras() {
    this.purchaseService.getPurchases().subscribe(
      (purchases : any[]) => {
        this.compras = purchases;
      }
    )
  }

  getProductos(purchase){
    this.productos = [];
    purchase['fk_product'].forEach(
      element => {
        this.snackService.getSnack(element).subscribe(
          (result) => {
            this.productos.push(result);
          }
        )
      }
    );
  }
}
