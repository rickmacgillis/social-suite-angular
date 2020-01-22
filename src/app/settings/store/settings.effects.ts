import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as SettingsActions from './settings.actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { Router } from '@angular/router';

export interface SettingsResponse {
  email: string;
}

export interface ConnectedAccountsResponse {
  providers: string[];
}

@Injectable()
export class SettingsEffects {

  constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}

  public loadSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.loadSettings),
      switchMap(action =>
        this.http.get(environment.apiBaseUrl + '/users/me').pipe(
          map((res: SettingsResponse) => SettingsActions.loadSettingsSuccess({ email: res.email }))
        )
      )
    )
  );

  public updateSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.updateSettingsStart),
      switchMap(action => {

        let props = { email: action.email };
        if (action.password) {
          props['password'] = action.password;
        }

        return this.http.patch(environment.apiBaseUrl + '/users/me', props).pipe(
          map((res: SettingsResponse) => SettingsActions.updateSettingsSuccess({ email: res.email })),
          catchError((res: HttpErrorResponse) => this.handleUpdateSettingsError(res))
        );

      })
    )
  );

  public loadConnectedAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.loadConnectedAccounts),
      switchMap(action => this.http.get(environment.apiBaseUrl + '/accounts').pipe(
        map((res: ConnectedAccountsResponse) => SettingsActions.loadConnectedAccountsSuccess({ providers: res.providers })),
        catchError((res: HttpErrorResponse) => this.handleConnectedAccountsError(res))
      ))
    )
  );

  public saveConnectedAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.saveConnectedAccount),
      switchMap(action => {

          let body = {
            code: action.code,
          };

          if (action.secret) {
            body['secret'] = action.secret;
          }

          return this.http.post(environment.apiBaseUrl + '/accounts/connect/' + action.provider + '/callback', body).pipe(
            map(res => SettingsActions.saveConnectedAccountSuccess()),
            catchError((res: HttpErrorResponse) => this.handleConnectedAccountCallbackError(res))
          );
          
        }
      )
    )
  );

  public saveConnectedAccountSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.saveConnectedAccountSuccess),
      tap(action => this.router.navigateByUrl('/settings/connected-accounts?success=1'))
    ),
    { dispatch: false }
  );

  public deleteConnectedAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.deleteConnectedAccount),
      switchMap(action =>
        this.http.delete(environment.apiBaseUrl + '/accounts/' + action.provider).pipe(
          map(res => SettingsActions.loadConnectedAccounts()),
          catchError((res: HttpErrorResponse) => this.handleDeleteConnectedAccountError(res))
        ) 
      )
    )
  );

  private handleUpdateSettingsError(errorRes: HttpErrorResponse) {
    const errorMessage = this.getError(errorRes);
    return of(SettingsActions.updateSettingsFail({ errorMessage }));
  }

  private handleConnectedAccountsError(errorRes: HttpErrorResponse) {
    const errorMessage = this.getError(errorRes);
    return of(SettingsActions.loadConnectedAccountsFail({ errorMessage }));
  }

  private handleConnectedAccountCallbackError(errorRes: HttpErrorResponse) {
    const errorMessage = this.getError(errorRes);
    return of(SettingsActions.saveConnectedAccountFail({ errorMessage }));
  }

  private handleDeleteConnectedAccountError(errorRes: HttpErrorResponse) {
    const errorMessage = this.getError(errorRes);
    return of(SettingsActions.deleteConnectedAccountFail({ errorMessage }));
  }

  private getError(errorRes: HttpErrorResponse) {

    let errorMessage = 'An unknown error ocurred.';
    if (!!errorRes.error && !!errorRes.error.error) {
      errorMessage = errorRes.error.error;
    }

    return errorMessage;

  }

}
