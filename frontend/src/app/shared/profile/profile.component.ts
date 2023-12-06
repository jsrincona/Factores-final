import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { User } from "src/app/core/models/users/user.model";
import { UserService } from "src/app/core/services/users/user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent {

  userLoading = {
    nombre: "",
    apellido: "",
    fecha_de_nacimiento: null,
    genero: "",
    telefono: 0,
    direccion: "",
    email: "",
    estado: "",

  };

  username = localStorage.getItem("username")
    ? localStorage.getItem("username")
    : "Loading...";
  user: any ;
  isEdited: boolean = false;
  isDeleteUser: boolean = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.userService.getUser().subscribe(
      (user: any) => {
        this.user = user;
        this.messageService.add({
          key: "grl-toast",
          severity: "success",
          summary: "Consulta exitosa",
          detail: "La consulta se realizo correctamente sobre la base de datos",
        });
      },
      (err) => {
        this.messageService.add({
          key: "grl-toast",
          severity: "error",
          summary: "Consulta realizada SIN ÉXITO",
          detail: "::: ERROR ::: \n" + err["error"]["detail"],
        });
      }
    );
  }

  editUsuario() {
    // let fecha = this.user.fecha_de_nacimiento.toString().split("T")[0];
    // this.user.fecha_de_nacimiento = fecha as any;
  }
  deleteUser() {
    this.isDeleteUser=true
    console.log("Usuario BORRADO");
  }

  saveUser() {
    this.userService.setUser(this.user).subscribe(
      (user: any) => {
        this.messageService.add({
          key: "grl-toast",
          severity: "success",
          summary: "Consulta exitosa",
          detail: "Se realizo la actualización correctamente",
        });
      },
      (err) => {
        this.messageService.add({
          key: "grl-toast",
          severity: "error",
          summary: "Consulta realizada SIN ÉXITO",
          detail: "::: ERROR ::: \n" + err["error"]["detail"],
        });
      }
    );
  }

}
