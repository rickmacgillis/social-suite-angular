import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, switchMap, map, catchError, take } from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { UserToken } from '../user-token.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
  user: any;
  token: string;
  expiresIn: number;
}

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  public authSignup$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.signupStart),
      switchMap(authAction => 

        this.http.post(
          environment.apiBaseUrl + '/users',
          {
            email: authAction.email,
            password: authAction.password,
          }
        ).pipe(
          map((authResponse: AuthResponseData) => this.handleAuthSuccess(authResponse.token, authResponse.expiresIn)),
          catchError(errorResponse => this.handleAuthError(errorResponse))
        )

      )
    )
  );

  public authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart),
      switchMap(action =>
        this.http.post(
          environment.apiBaseUrl + '/users/login',
          {
            email: action.email,
            password: action.password,
          }
        ).pipe(
          map((authResponse: AuthResponseData) => this.handleAuthSuccess(authResponse.token, authResponse.expiresIn)),
          catchError(errorResponse => this.handleAuthError(errorResponse))
        )
      )
    )
  );

  public authRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authenticateSuccess),
      tap(action => action.redirect && this.router.navigate(['/dashboard']))
    ),
    { dispatch: false }
  );

  public authAutoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      map(action => {

        const userData: { _token: string, _tokenExpirationDate: Date } = JSON.parse(localStorage.getItem('userData'));
        if (!userData || !userData._token) {
          return { type: 'STUB' };
        }

        const expirationDate = new Date(userData._tokenExpirationDate);
        const expirationDuration = expirationDate.getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);

        return AuthActions.authenticateSuccess({
          token: userData._token,
          expirationDate,
          redirect: false,
        });

      })
    )
  );

  public authLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(action =>

        this.http.post(environment.apiBaseUrl + '/users/logout', {}).pipe(
          map(res => this.handleLogoutFinished()),
          catchError(res => of(this.handleLogoutFinished()))
        )

      )
    )
  );

  public resetPasswordStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPasswordStart),
      switchMap(action =>
        
        this.http.post(environment.apiBaseUrl + '/users/reset-password', { email: action.email }).pipe(
          map(res => AuthActions.resetPasswordSuccess()),
          catchError((res: HttpErrorResponse) => this.handleResetPasswordError(res))
        )

      )
    )
  );

  public resetPasswordConfirmStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPasswordConfirmStart),
      switchMap(action =>
        this.http.patch(environment.apiBaseUrl + '/users/reset-password', {
          password: action.password,
          token: action.token,
        }).pipe(
          map(res => AuthActions.resetPasswordConfirmSuccess()),
          catchError((res: HttpErrorResponse) => this.handleResetPasswordConfirmError(res))
        )
      )
    )
  );

  handleAuthSuccess(token: string, tokenExpires: number) {

    const expirationDate = new Date(tokenExpires * 1000);
    const userToken = new UserToken(token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(userToken));

    const msUntilExpired = (tokenExpires * 1000) - new Date().getTime();
    this.authService.setLogoutTimer(msUntilExpired);

    return AuthActions.authenticateSuccess({
      token,
      expirationDate,
      redirect: true,
    });

  }

  handleAuthError(errorRes: HttpErrorResponse) {

    let errorMessage = 'An unknown error ocurred.';
    if (!!errorRes.error && !!errorRes.error.error) {
      errorMessage = errorRes.error.error;
    }

    return of(AuthActions.authenticateFail({ errorMessage }));

  }

  handleLogoutFinished() {
    localStorage.removeItem('userData');
    this.router.navigate(['auth']);

    return AuthActions.logoutEnd();
  }

  handleResetPasswordError(errorRes: HttpErrorResponse) {

    let errorMessage = 'An unknown error ocurred.';
    if (!!errorRes.error && !!errorRes.error.error) {
      errorMessage = errorRes.error.error;
    }

    return of(AuthActions.resetPasswordFailure({ errorMessage }));

  }

  handleResetPasswordConfirmError(errorRes: HttpErrorResponse) {

    let errorMessage = 'An unknown error ocurred.';
    if (!!errorRes.error && !!errorRes.error.error) {
      errorMessage = errorRes.error.error;
    }

    return of(AuthActions.resetPasswordConfirmFailure({ errorMessage }));

  }

}
