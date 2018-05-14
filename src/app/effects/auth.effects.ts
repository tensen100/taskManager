import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import {
  AuthActionTypes,
  LoginAction,
  LoginFailAction,
  LoginSuccessAction,
  RegisterAction,
  RegisterFailAction,
  RegisterSuccessAction
} from '../actions/auth.action';
import { User } from '../domain';
import { Router } from '@angular/router';
import {exhaustMap, tap, map, catchError} from 'rxjs/operators';

@Injectable()
export class AuthEffects {

  @Effect()
  login$: Observable<Action> = this.action$
    .ofType(AuthActionTypes.LOGIN)
    .map((action: LoginAction) => action.payload)
    .switchMap(
      ({email, password}) => this.service$.login(email, password)
        .map(auth => new LoginSuccessAction(auth))
        .catch(err => Observable.of(new LoginFailAction(JSON.stringify(err))))
    );
/*  @Effect()
  login$: Observable<Action> = this.action$.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LoginAction) => action.payload),
    exhaustMap(({email, password}) =>
      this.service$.login(email, password)
        .pipe(
          map((auth) => {
            console.log(auth);
            return new LoginSuccessAction(auth);
          }),
          catchError(err => Observable.of(new LoginFailAction(JSON.stringify(err))))
      )
    )
  );*/


  @Effect()
  register$: Observable<Action> = this.action$
    .ofType(AuthActionTypes.REGISTER)
    .map((action: RegisterAction) => action.payload)
    .switchMap(
      (user: User) => this.service$.register(user)
        .map(auth => new RegisterSuccessAction(auth))
        .catch(err => Observable.of(new RegisterFailAction(JSON.stringify(err))))
    );

  @Effect({ dispatch: false })
  logout$: Observable<Action> = this.action$
    .ofType(AuthActionTypes.LOGOUT, AuthActionTypes.LOGIN_REGISTER)
    .do(_ => this.router.navigate(['/']));

  @Effect({ dispatch: false })
  loginSuccess$ = this.action$
    .ofType(AuthActionTypes.LOGIN_SUCCESS)
    .do( _ => this.router.navigate(['/project']));
/*  @Effect({ dispatch: false })
  loginSuccess$ = this.action$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap( d => console.log(d))
  );*/

  @Effect({ dispatch: false })
  registerSuccess$: Observable<Action> = this.action$
    .ofType(AuthActionTypes.REGISTER_SUCCESS)
    .do(_ => this.router.navigate(['/projects']));
  constructor(private action$: Actions, private service$: AuthService, private router: Router) {}
}
