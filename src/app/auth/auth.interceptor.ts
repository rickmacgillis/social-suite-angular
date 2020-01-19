import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as fromApp from '../reducers';
import { take, map, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private store: Store<fromApp.State>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.userToken;
            }),
            exhaustMap(token => {
                
                if (!token) {
                    return next.handle(req);
                }

                const modifiedRequest = req.clone({
                    headers: new HttpHeaders({
                        Authorization: 'Bearer ' + token.token,
                    }),
                });

                return next.handle(modifiedRequest);

            })
        );

    }

}
