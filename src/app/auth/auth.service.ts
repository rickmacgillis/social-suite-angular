import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../reducers/index';
import * as AuthActions from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private logoutTimer = null;

    constructor(private store: Store<fromApp.State>) {}

    setLogoutTimer(expiresMs: number) {

        this.logoutTimer = setTimeout(() => {
            this.store.dispatch(AuthActions.logout());
        }, expiresMs);

    }

    clearLogoutTimer() {
        if (this.logoutTimer) {
            clearTimeout(this.logoutTimer);
            this.logoutTimer = null;
        }
    }

}
