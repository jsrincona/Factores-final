import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { ROLES } from 'src/app/core/models/users/roles.enum';
import { TokenModel } from 'src/app/core/models/users/token.model';
import { User } from 'src/app/core/models/users/user.model';
import { AuthService } from 'src/app/core/services/users/auth.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  // Referencia de página de documentación
  docs = environment.docs;
  cronograma = environment.cronograma;
  repositorio = environment.repositorio;
  me = environment.jsrincona;
  profesor = environment.profesor;
  materia = environment.materia;
  proyecto = environment.proyecto;
  integrantes = environment.integrantes;
  // Datos del usuario
  username:string="";
  password:string="";
  passwordConfirmation:string="";
  // Cargando la petición
  isLoading: boolean;
  // Registro e ingreso
  isLogin: boolean = true;
  // Control de modal
  display:boolean = false;
  listMultiplex: any[] = [];

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private authSvc: AuthService,
    private messageService: MessageService,
  ){}

  ngOnInit(){
    
  }

  signUp(){
    this.authSvc.onClean();
    // if(this.loginForm.controls.password.value == passwordConfirmation){
      // this.authSvc.onSignUp(this.loginForm.controls.username.value, this.loginForm.controls.password.value).subscribe(
      //   {
      //       next: (data: TokenModel) => {
      //         sessionStorage.setItem('token', data.token);
      //         sessionStorage.setItem('role', data.role);
      //         sessionStorage.setItem('id', data.id.toString());
      //         this.messageService.add({key:'grl-toast', severity:'success', summary:'Ingreso correcto', detail:'Bienvenido a la plataforma'});
      
      //         if (data.role === ROLES.ADMINISTRATOR) {
      //           this.router.navigate(['/admin']);
      //         } else {
      //           this.router.navigate(['/app']);
      //         }
      //       },
    
      //     error: (any) => {
      //       this.messageService.add({key:'grl-toast', severity:'error', summary:'Ingreso Incorrecto', detail:'Datos de ingreso incorrectos'});
      //     }
      //   }
      // );
    //}
  }

  logIn() {
    this.isLoading = true;
    this.authSvc.onClean();
    this.authSvc.onLogin(this.username, this.password).subscribe(
      {
          next: (data) => {
            localStorage.setItem('token', data['token']);
            localStorage.setItem('email', data['email']);
            localStorage.setItem('username', data['username']);
            localStorage.setItem('id', data['user_id']);
            localStorage.setItem('role', data['role']);
            this.messageService.add({key:'grl-toast', severity:'success', summary:'Ingreso correcto', detail:'Bienvenido a la plataforma'});
            if(data["role"] === ROLES.ADMINISTRATOR || data["role"] === ROLES.ADMIN_ADMIN){
              this.router.navigate(['/admin']);
            }else{
              if (data["role"] === ROLES.EMPLEADO || data["role"] === ROLES.CLIENTE) {
                this.router.navigate(['/app']);
              } else {
                this.router.navigateByUrl(environment.server+'/admin');
              }
            }
          },
  
        error: (err) => {
          this.messageService.add({key:'grl-toast', severity:'error', summary:'Ingreso Incorrecto', detail:'Datos de ingreso incorrectos\n'+err['error']['detail']});
        }
      }
    );
  }

  onClear(){
    this.username="";
    this.password="";
  }

  logger(event:any){
    console.log(event);
  }
}
