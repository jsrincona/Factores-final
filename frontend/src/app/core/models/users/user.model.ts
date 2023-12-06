const roles = ['Administrador', 'Empleado', 'Cliente']

export class User{
  n_id ?: number;
  t_id: string;
  n_phone:number;
  email: string;
  name: string;
  is_active:boolean;
  is_superuser:boolean;
  is_staff:boolean;
  last_login:boolean; 
  password:string;  
}

export class Employee extends User {
  n_salary:number;
  d_start_contract:Date;
  d_end_contract:Date;
  t_rol:number;
  fk_cinema : number;
}

export class Customer extends User{
  n_points:number; 
}

export const proto_customer = {
  "n_id": 0,
  "t_id": "",
  "n_phone": 0,
  "email": "",
  "name": "",
  "is_active": false,
  "is_superuser": false,
  "is_staff": false,
  "last_login": false,
  "password": "",
  "n_points": 0,
}

export const proto_employee = {
  "n_id": 0,
  "t_id": "",
  "n_phone": 0,
  "email": "",
  "name": "",
  "is_active": false,
  "is_superuser": false,
  "is_staff": false,
  "last_login": false,
  "password": "",
  n_salary: 0,
  d_start_contract: new Date(Date.now()),
  d_end_contract: new Date(Date.now()),
  t_rol: 2,
  fk_cinema : 12,
}
