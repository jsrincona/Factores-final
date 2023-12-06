import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Customer, Employee, User } from '../../models/users/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  headers = new HttpHeaders();

  constructor(
    private http: HttpClient
  ) { 
    this.headers = this.headers.append("Content-Type", "application/json");
  }

  getUserByUsername(username):Observable<User>{
    return this.http.get<User>(
      environment.api + 'user/'+username+'/',
      {headers: this.headers}
    )
  }
  getUser():Observable<User>{
    return this.http.get<User>(
      environment.api + 'user/me/',
      {headers: this.headers}
    )
  }
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(
      environment.api + 'user/get/',
      {headers: this.headers}
    )
  }
  setUser(usuario):Observable<User>{
    var body = JSON.stringify(usuario)
    return this.http.post<User>(
      environment.api + 'user/set/',
      body,
      {headers: this.headers}
    )
  }
  deleteUser(usuario):Observable<User>{
    var body = JSON.stringify(usuario)
    return this.http.post<User>(
      environment.api + 'user/del/',
      body,
      {headers: this.headers}
    )
  }

  getUsersEmployee():Observable<Employee[]>{
    return this.http.get<Employee[]>(
      environment.api + 'user/employee/list/',
      {headers: this.headers}
    )
  }
  getUsersCustomer():Observable<Customer[]>{
    return this.http.get<Customer[]>(
      environment.api + 'user/customer/list/',
      {headers: this.headers}
    )
  }
  setUserEmp(usuario:Employee):Observable<Employee>{
    var body = JSON.stringify({
      "n_id": usuario.n_id,
      "t_id": usuario.t_id ,
      "n_phone": usuario.n_phone,
      "email": usuario.email,
      "name": usuario.name,
      "password": usuario.password,
      "n_salary": usuario.n_salary,
      "d_start_contract": usuario.d_start_contract,
      "d_end_contract": usuario.d_end_contract,
      "t_rol": usuario.t_rol
    })
    return this.http.post<Employee>(
      environment.api + 'user/employee/create/',
      body,
      {headers: this.headers}
    )
  }
  setUserCli(cliente: Customer):Observable<Customer>{
    var body = JSON.stringify({
      "n_id": cliente.n_id,
      "t_id": cliente.t_id,
      "n_phone":cliente.n_phone,
      "email":cliente.email,
      "name":cliente.name,
      "password":cliente.password,
      "n_points": cliente.n_points

    })
    return this.http.post<Customer>(
      environment.api + 'user/customer/create/',
      body,
      {headers: this.headers}
    )
  }
  createUserCli(usuario):Observable<User>{
    var body = JSON.stringify(usuario)
    return this.http.post<User>(
      environment.api + 'client/create/',
      body,
      {headers: this.headers}
    )
  }
}
