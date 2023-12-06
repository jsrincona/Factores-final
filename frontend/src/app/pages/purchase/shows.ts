import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TicketService } from '@services/ticket/ticket.service';
import { ShowService } from '@services/show/show.service';
import { Show } from '@models/shows/show.model';
import { MovieService } from '@services/movies/movie.service';
@Component({
    template: `
        <div class="stepsdemo-content">
            <p-card>
                <ng-template pTemplate="title"> Funciones  </ng-template>
                <ng-template pTemplate="subtitle"> Elige el horario en que desees ver la película </ng-template>
                <ng-template pTemplate="content">
                <div class="card">
                    <p-table [value]="shows" [(selection)]="show" [tableStyle]="{'min-width': '50rem'}">
                        <ng-template pTemplate="header">
                            <tr>
                                <th style="width: 4rem"></th>
                                <th>Fecha</th>
                                <th>Hora de inicio</th>
                                <th>Hora de finalización</th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-show>
                            <tr>
                                <td>
                                    <p-tableRadioButton [value]="show"></p-tableRadioButton>
                                </td>
                                <td>{{show.d_date}}</td>
                                <td>{{show.d_start_time}}</td>
                                <td>{{show.d_end_time}}</td>
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

export class ShowsDemo implements OnInit {
    constructor(
        public ticketService: TicketService, 
        private router: Router,
        private messageService: MessageService,
        private showService : ShowService
    ) {}
    shows : Show [];
    show : Show;
    products: any;
    productList : any[];
    productListCarrito : any[];

    ngOnInit() {
        this.getShow();
        this.products = this.ticketService.ticketInformation.show;
    }
    
    prevPage() {
        this.router.navigate(['admin/mis-compras/movies']);
    }
    
    nextPage() {
        this.ticketService.ticketInformation.show = this.show;
        this.router.navigate(['admin/mis-compras/halls']);
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
        this.ticketService.ticketInformation.show = null;
        this.showService.getShows().subscribe(
            (data) => {
                // Filtrar shows basados en la película seleccionada
                let selectedMovie = this.ticketService.ticketInformation.movie;
                if (selectedMovie) {
                    this.shows = data.filter(show => show.fk_movie == this.ticketService.ticketInformation.movie.pk_id);
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

    
    eliminarCarrito(id){

    }
}