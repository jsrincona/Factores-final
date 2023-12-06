import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { Customer, Employee, User, proto_customer, proto_employee } from "src/app/core/models/users/user.model";
import { UserService } from "@services/users/user.service";
@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent {
  empleado : Employee;
  empleados: Employee[];
  selectedEmpleados: Employee[];
  empleadoDialog: boolean;

  cliente: Customer;
  clientes: Customer[];
  selectedClientes: Customer[];
  clienteDialog: boolean;

  submittedEmpleado: boolean = false;
  submittedCliente: boolean = false;
  statuses!: any[];

  isModeEdited: boolean = false;
  isEmployeeEdited: boolean = true;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getCustomers()
    this.getEmployees()
  }

  openNewEmpleado() {
    this.empleado = proto_employee;
    this.submittedEmpleado = false;
    this.empleadoDialog = true;
  }

  deleteSelectedEmpleados() {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete the selected empleados?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.empleados = this.empleados.filter(
          (val) => !this.selectedEmpleados?.includes(val)
        );
        this.selectedEmpleados = null;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "empleados Deleted",
          life: 3000,
        });
      },
    });
  }

  editEmpleado(empleado: Employee) {
    this.empleado = { ...empleado };
    this.empleadoDialog = true;
    this.isEmployeeEdited = false ;
  }

  deleteEmpleado(empleado: Employee) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + empleado.name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.empleados = this.empleados.filter(
          (val) => val.n_id !== empleado.n_id
        );
        this.empleado = null;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "empleado Deleted",
          life: 3000,
        });
      },
    });
  }

  hideDialogEmpleado() {
    this.empleadoDialog = false;
    this.submittedEmpleado = false;
    this.isEmployeeEdited = true;
  }

  saveEmpleado() {
    this.submittedEmpleado =true;

    if (this.empleado.name?.trim()) {
      console.log(this.empleado)
      if (this.empleados[this.findIndexByIdEmpleado(this.empleado.n_id)]) {
        this.empleados[this.findIndexByIdEmpleado(this.empleado.n_id)] = this.empleado;
        console.log("si existe")
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "empleado Updated",
          life: 3000,
        });
      } else {
        console.log("no existe pero ya lo va a crear todo bien")
        this.userService.setUserEmp(this.empleado).subscribe(
          (empleado:Employee) =>{
            this.empleados.push(empleado);
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "empleado Created",
              life: 3000,
            })
          },
          (error) =>{
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Employee not Created",
              life: 3000,
            });
          }
        )
      }

      this.empleados = [...this.empleados];
      this.empleadoDialog = false;
      this.empleado = null;
    }
  }

  findIndexByIdEmpleado(id: number): number {
    let index = -1;
    for (let i = 0; i < this.empleados.length; i++) {
      if (this.empleados[i].n_id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  openNewCliente() {
    this.cliente = proto_customer;
    this.submittedCliente = false;
    this.clienteDialog = true;
  }

  deleteSelectedClientes() {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete the selected empleados?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.clientes = this.clientes.filter(
          (val) => !this.selectedClientes?.includes(val)
        );
        this.selectedEmpleados = null;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "empleados Deleted",
          life: 3000,
        });
      },
    });
  }

  editCliente(cliente: Customer) {
    this.cliente = { ...cliente };
    this.clienteDialog = true;
  }

  deleteCliente(cliente: Customer) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + cliente.name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.clientes = this.clientes.filter(
          (val) => val.n_id !== cliente.n_id
        );
        this.cliente = null;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "empleado Deleted",
          life: 3000,
        });
      },
    });
  }

  hideDialogCliente() {
    this.clienteDialog = false;
    this.submittedCliente = false;
  }

  saveCliente() {
    this.submittedCliente = true;

    if (this.cliente.name?.trim()) {
      if (this.clientes[this.findIndexByIdCliente(this.cliente.n_id)]) {
        this.clientes[this.findIndexByIdCliente(this.cliente.n_id)] = this.cliente;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "empleado Updated",
          life: 3000,
        });
      } else {
        this.userService.setUserCli(this.cliente).subscribe(
          (cliente : Customer) => {
            this.clientes.push(this.cliente);
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "empleado Created",
              life: 3000,
            });
          },
          (error) =>{
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Customer not Created",
              life: 3000,
            });
          }

        )
      }

      this.clientes = [...this.clientes];
      this.clienteDialog = false;
      this.cliente = null;
    }
  }

  findIndexByIdCliente(id: number): number {
    let index = -1;
    for (let i = 0; i < this.clientes.length; i++) {
      if (this.clientes[i].n_id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  getCustomers(){
    this.userService.getUsersCustomer().subscribe(
      (data) => {
        this.clientes = data;
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

  getEmployees(){
    this.userService.getUsersEmployee().subscribe(
      (data) => {
        this.empleados = data;
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
