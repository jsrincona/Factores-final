import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TicketService } from '@services/ticket/ticket.service';
import { ShowService } from '@services/show/show.service';
import { Show } from '@models/shows/show.model';
import { MovieService } from '@services/movies/movie.service';
import { Hall } from '@models/hall/hall.model';
import { HallService } from '@services/halls/hall.service';
@Component({
    template: `
        <div class="stepsdemo-content">
            <p-card>
                <ng-template pTemplate="title"> Salas  </ng-template>
                <ng-template pTemplate="subtitle"> Elige la sala en que desees ver la película </ng-template>
                <ng-template pTemplate="content">
                <div class="card">
                    <p-table [value]="shows" [(selection)]="show" [tableStyle]="{'min-width': '50rem'}">
                        <ng-template pTemplate="header">
                            <tr>
                                <th style="width: 4rem"></th>
                                <th>ID</th>
                                <th>Estado</th>
                                <th>Teatro</th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-show>
                            <tr>
                                <td>
                                    <p-tableRadioButton [value]="show"></p-tableRadioButton>
                                </td>
                                <td>{{show.pk_id}}</td>
                                <td>{{show.b_state? 'Disponible':'No Disponible'}}</td>
                                <td>{{show.fk_theater}}</td>
                            </tr>
                        </ng-template>
                    </p-table>
                </div>
            </ng-template>
            <ng-template pTemplate="footer">
                <div class="grid grid-nogutter justify-content-between">
                    <p-button label="Volver" (onClick)="prevPage()" icon="pi pi-angle-left"></p-button>
                    <p-button label="Siguiente" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right"></p-button>
                    </div>
                </ng-template>
            </p-card>
        </div>
        `
})

export class HallDemo implements OnInit {
    constructor(
        public ticketService: TicketService, 
        private router: Router,
        private messageService: MessageService,
        private showService : ShowService,
        private hallService : HallService
    ) {}
    shows : Hall [];
    show : Hall;

    ngOnInit() {
        this.getShow();
    }
    
    prevPage() {
        this.router.navigate(['admin/mis-compras/shows']);
    }
    
    nextPage() {
        this.ticketService.ticketInformation.hall = this.show;
        this.router.navigate(['admin/mis-compras/seat']);
    }
    
    agregarCarrito(id,product){
			let data = {
				id_producto: id,
				id_pedido: 3265,
				cantidad: product.cantidad,
				precio_unitario: product.precio
			}
    }

    getShow(){
        this.ticketService.ticketInformation.hall = null;
        this.hallService.getHalls().subscribe(
            (data) => {
                // Filtrar shows basados en la película seleccionada
                let selectedShow = this.ticketService.ticketInformation.show;
                console.log(selectedShow);
                if (selectedShow) {
                    this.shows = data.filter(hall => hall.pk_id  == this.ticketService.ticketInformation.show.fk_hall);
                } else {
                    this.shows = data;
                }
            },
            (err)=>{
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: "Error en la petición",
                life: 3000,
              });
            }
        )
        
    }
}