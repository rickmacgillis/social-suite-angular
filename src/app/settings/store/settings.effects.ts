import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as SettingsActions from './settings.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

export interface SettingsResponse {
  email: string;
}

@Injectable()
export class SettingsEffects {

  constructor(private actions$: Actions, private http: HttpClient) {}

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

  private handleUpdateSettingsError(errorRes: HttpErrorResponse) {

    let errorMessage = 'An unknown error ocurred.';
    if (!!errorRes.error && !!errorRes.error.error) {
      errorMessage = errorRes.error.error;
    }

    return of(SettingsActions.updateSettingsFail({ errorMessage }));

  }

}
