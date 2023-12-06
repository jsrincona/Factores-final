import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Snack } from "@models/products/products.model";
import { TicketService } from "@services/ticket/ticket.service";
import { SnackService } from "@services/products/snack.service";

@Component({
  template: `
    <div class="stepsdemo-content">
      <p-card>
        <ng-template pTemplate="title"> Snacks </ng-template>
        <ng-template pTemplate="subtitle"> Elige tus snacks </ng-template>
        <ng-template pTemplate="content">
          <div class="card">
            <p-table [value]="snacks" [(selection)]="snacksSelected" [tableStyle]="{'min-width': '50rem'}">
                <ng-template pTemplate="header">
                    <tr>
                        <th style="width: 4rem">
                            <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
                        </th>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Disponible</th>
                        <th>Tipo</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-snack>
                    <tr>
                        <td>
                            <p-tableCheckbox [value]="snack"></p-tableCheckbox>
                        </td>
                        <td>{{ snack.pk_id }}</td>
                        <td>{{ snack.t_name }}</td>
                        <td>{{ snack.t_description }}</td>
                        <td>{{ snack.n_price }}</td>
                        <td>{{ snack.n_stock > 0 ? "Sí" : "No" }}</td>
                        <td>{{ snack.t_type }}</td>
                    </tr>
                </ng-template>
            </p-table>
          </div>
        </ng-template>
        <ng-template pTemplate="footer">
          <div class="grid grid-nogutter justify-content-between">
            <p-button
              label="Volver"
              (onClick)="prevPage()"
              icon="pi pi-angle-left"
            ></p-button>
            <p-button
              label="Siguiente"
              (onClick)="nextPage()"
              icon="pi pi-angle-right"
              iconPos="right"
            ></p-button>
          </div>
        </ng-template>
      </p-card>
    </div>
  `,
})
export class SnacksDemo implements OnInit {
  constructor(
    public ticketService: TicketService,
    public snackService: SnackService,
    private router: Router,
    private messageService: MessageService
  ) {}
  snacks: Snack[];
  snacksSelected : Snack[]; 

  ngOnInit() {
    this.getSnacks();
  }

  prevPage() {
    this.router.navigate(["admin/mis-compras/seat"]);
  }

  nextPage() {
    this.ticketService.ticketInformation.snacks = this.snacksSelected;
    this.router.navigate(["admin/mis-compras/payment"]);
  }

  getSnacks() {
    this.ticketService.ticketInformation.snacks = [];
    this.snackService.getSnacks().subscribe(
      (data) => {
        this.snacks = data;
      },
      (err) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Error en la petición",
          life: 3000,
        });
      }
    );
  }
}
