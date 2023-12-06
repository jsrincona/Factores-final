import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from 'src/app/core/services/users/auth.service';

@Injectable({providedIn:'root'})
export class LogInResolverService implements Resolve<any> {

  constructor(
    private authSvc:AuthService
  ){}

  data:any=["a","b","c"]
  resolve():Observable<any>{
  //   //TODO: implement service
    return this.data
  }
}