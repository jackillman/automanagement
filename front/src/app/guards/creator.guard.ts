import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { StateService } from "../services/state.service";

@Injectable()
export class CreatorGuard implements CanActivate {
  constructor(private SS:StateService,private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if(this.SS.isAuth && this.SS.currentUser.isCreator) {
       
        return of(true)
    } else {
        this.router.navigate(['/dashboard'])
        return of(false)
    }
   
    
  }
}