import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../reducers';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectGuard implements CanActivate {

  constructor(private router: Router, private store: Store<fromApp.State>) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
   
    return this.store.select("auth").pipe(
      take(1),
      map(authState => {

        if (!!authState.userToken) {
          return this.router.createUrlTree(["/dashboard"]);
        }
  
        return true;
  
      })
    );

  }
  
}
