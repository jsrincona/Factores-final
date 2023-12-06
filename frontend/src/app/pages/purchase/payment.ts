import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from '@services/ticket/ticket.service';
import { MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="stepsdemo-content">
            <p-card>
                <ng-template pTemplate="title"> Información de pago </ng-template>
                <ng-template pTemplate="subtitle"> Ingresa los detalles de tu pago </ng-template>
                <ng-template pTemplate="content">
                    <select (change)="paymentMethod($event)" class="form-select" style="outline: none;background: white; border: none; min-width:100px; min-height: 40px;">
                        <option value ="PE" > visa </option>
                        <option value ="TC" selected>otro :)</option>
                    </select>
                    <div *ngIf="paymentMethodSelected == 'PE'" class="pse-button">
                        <img width="100px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.lIAd86vNiOtS15yRQF4juQAAAA%26pid%3DApi&f=1&ipt=84765d7c18fd5450799f7b638b9f491676dbcb8c2fa70e6d89fa5760697663c1&ipo=images" alt="Boton PSE" >
                    </div>
                    <div *ngIf="paymentMethodSelected == 'TC'" class="p-fluid">
                        <div class="field col-12">
                            <label for="class">Nombre del propietario de la tarjeta</label>
                            <input type="text" required pInputText [(ngModel)]="paymentInformation.cardholderName" />
                        </div>
                        <div class="field col-8">
                            <label id="number" for="lastname">Número</label>
                            <p-inputMask inputId="number" mask="9999-9999-9999-9999" [(ngModel)]="paymentInformation.cardholderNumber"></p-inputMask>
                        </div>
                        <div class="field col-2">
                            <label id="date" for="date">Fecha de vencimiento</label>
                            <p-inputMask inputId="date" mask="99/99" [(ngModel)]="paymentInformation.date"></p-inputMask>
                        </div>
                        <div class="field col-2">
                            <label for="cvv">CCV</label>
                            <p-inputMask id="cvv" mask="999" [(ngModel)]="paymentInformation.cvv"></p-inputMask>
                        </div>
                        <div class="field-checkbox col-12">
                            <p-checkbox id="remember" [binary]="true" [(ngModel)]="paymentInformation.remember"></p-checkbox>
                            <label for="remember" class="p-checkbox-label">Agrega está tarjeta para futuras compras.</label>
                        </div>
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
export class PaymentDemo implements OnInit {
    paymentInformation: any;
    listPayment: any[];
    paymentMethodSelected = '';

    constructor(
        public ticketService: TicketService, 
        private router: Router,
        private messageService: MessageService,
    ) {}
    
    ngOnInit() {
        this.paymentInformation = this.ticketService.ticketInformation.paymentInformation;
        // this.metodoService.getMetodoPagos().subscribe(
        //     (data)=>{
        //         this.listPayment = data['data'];
        //         this.messageService.add({
        //             key: "grl-toast",
        //             severity: "success",
        //             summary: "Consulta exitosa",
        //             detail: "La consulta se realizo correctamente sobre la base de datos - Países Cargados",
        //         });
        //     },
        //     (error)=>{
        //         this.messageService.add({
        //             key: "grl-toast",
        //             severity: "error",
        //             summary: "ERROR",
        //             detail: "La consulta se realizo con errores"+error,
        //         });
        //     }
        // )
    }

    paymentMethod(event){
        this.paymentMethodSelected = event.target.value
    }

    nextPage() {
        this.ticketService.ticketInformation.paymentInformation = this.paymentInformation;
        this.router.navigate(['admin/mis-compras/confirmation']);
    }

    prevPage() {
        this.router.navigate(['admin/mis-compras/snacks']);
    }
}