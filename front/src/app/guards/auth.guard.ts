import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { StateService } from "../services/state.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private SS:StateService,private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if(this.SS.isAuth) {
       
        return of(true)
    } else {
        this.router.navigate([''])
        return of(false)
    }
   
    
  }
}