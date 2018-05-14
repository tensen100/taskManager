import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { getAuthState } from '../reducers';
import {LoginRegisterAction} from '../actions/auth.action';



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store$: Store<fromRoot.State>, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store$.select(getAuthState)
      .map(auth => {
        const result = auth.token !== null && auth.token !== undefined;
        console.log(result);
        if (result) {
          this.store$.dispatch(new LoginRegisterAction(null));
          return false;
        }
        return true;
      })
      .defaultIfEmpty(false);
    // return Observable.of(true);
  }
}
