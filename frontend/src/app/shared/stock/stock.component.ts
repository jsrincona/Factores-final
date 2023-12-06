import { Component } from "@angular/core";
import { Snack, Ticket, proto_prod_snack, proto_prod_ticket } from "@models/products/products.model";
import { SnackService } from "@services/products/snack.service";
import { TicketService } from "@services/products/ticket.service";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: "app-stock",
  templateUrl: "./stock.component.html",
  styleUrls: ["./stock.component.scss"],
})
export class StockComponent {
  snackDialog: boolean = false;

  snacks!: Snack[];
  snack!: Snack;
  selectedSnacks!: Snack[] | null;
  submittedSnack: boolean = false;
  statusesSnack!: any[];

  ticketDialog: boolean = false;
  
  tickets!: Ticket[];
  ticket!: Ticket;
  selectedTickets!: Ticket[] | null;
  submittedTicket: boolean = false;
  statusesTicket!: any[];

  constructor(
    private snackService: SnackService,
    private ticketService: TicketService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getSnacks();
    this.getTickets();
  }

  getSnacks() {
    this.snackService.getSnacks().subscribe((data) => (this.snacks = data));
  }

  getTickets() {
    this.ticketService.getTickets().subscribe((data) => (this.tickets = data));
  }

  openNewSnack() {
    this.snack = proto_prod_snack;
    this.submittedSnack = false;
    this.snackDialog = true;
  }

  deleteSelectedSnacks() {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete the selected snacks?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.snacks = this.snacks.filter(
          (val) => !this.selectedSnacks?.includes(val)
        );
        this.selectedSnacks = null;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Snacks Deleted",
          life: 3000,
        });
      },
    });
  }

  editSnack(snack: Snack) {
    this.snack = { ...snack };
    this.snackDialog = true;
  }

  deleteSnack(snack: Snack) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + snack.t_name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.snackService.deleteSnack(snack).subscribe(
          (snack) => {
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "Snack Deleted",
              life: 3000,
            }); 
            this.getSnacks(); 
          },
          (error) =>{
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Snack not Delete",
              life: 3000,
            });
          }
        )
      },
    });
  }

  hideDialogSnack() {
    this.snackDialog = false;
    this.submittedSnack = false;
  }

  saveSnack() {
    this.submittedSnack = true;

    if (this.snack.t_name?.trim()) {
      if (this.snack.pk_id) {
        this.snackService.updateSnack(this.snack).subscribe(
          (snack : Snack) => {
           this.snacks[this.findIndexByIdSnack(snack.pk_id)] = snack;
           this.messageService.add({
             severity: "success",
             summary: "Successful",
             detail: "Snack Updated",
             life: 3000,
           });
         },
         (error) =>{
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Snack not Update",
            life: 3000,
          });
        } 
        )
      } else {
        this.snackService.setSnack(this.snack).subscribe(
          (snack: Snack) => {
            this.snacks.push(snack);
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "Snack Created",
              life: 3000,
            });
          },
          (error) =>{
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Snack not Created",
              life: 3000,
            });
          }
        )
      }

      this.snacks = [...this.snacks];
      this.snackDialog = false;
      this.snack = proto_prod_snack;
    }
  }

  findIndexByIdSnack(id: number): number {
    let index = -1;
    for (let i = 0; i < this.snacks.length; i++) {
      if (this.snacks[i].pk_id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  getSeverity(status: number) {
    if (status > 50) {
      return "success";
    } else {
      if (status >= 10 && status <= 50) {
        return "warning";
      } else {
        return "danger";
      }
    }
  }

  openNewTicket() {
    this.ticket = proto_prod_ticket;
    this.submittedTicket = false;
    this.ticketDialog = true;
  }

  deleteSelectedTickets() {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete the selected tickets?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.tickets = this.tickets.filter(
          (val) => !this.selectedTickets?.includes(val)
        );
        this.selectedTickets = null;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Tickets Deleted",
          life: 3000,
        });
      },
    });
  }

  editTicket(ticket: Ticket) {
    this.ticket = { ...ticket };
    this.ticketDialog = true;
  }

  deleteTicket(ticket: Ticket) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + ticket.t_name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.ticketService.deleteTicket(ticket).subscribe(
          (ticket)=>{
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "Ticket Deleted",
              life: 3000,
            });
            this.getTickets();
          },
          (error) =>{
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Ticket not Delete",
              life: 3000,
            });
          }
        )
      },
    });
  }

  hideDialogTicket() {
    this.ticketDialog = false;
    this.submittedTicket = false;
  }

  saveTicket() {
    this.submittedTicket = true;

    if (this.ticket.t_name?.trim()) {
      if (this.ticket.pk_id) {
        this.ticketService.updateTicket(this.ticket).subscribe(
          (ticket : Ticket) => {
            this.tickets[this.findIndexByIdTicket(ticket.pk_id)] = ticket;
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "Ticket Updated",
              life: 3000,
            });

          },
          (error) =>{
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Ticket not Update",
              life: 3000,
            });
          }
        )
      }
      
      else {
        this.ticketService.setTicket(this.ticket).subscribe(
          (ticket : Ticket) => {
            this.tickets.push(ticket);
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "Ticket Created",
              life: 3000,
            });
          },
          (error) =>{
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Ticket not Created",
              life: 3000,
            });
          }
        )
      }

      this.tickets = [...this.tickets];
      this.ticketDialog = false;
      this.ticket = proto_prod_ticket;
    }
  }

  findIndexByIdTicket(id: number): number {
    let index = -1;
    for (let i = 0; i < this.tickets.length; i++) {
      if (this.tickets[i].pk_id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
