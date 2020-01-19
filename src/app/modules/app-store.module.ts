import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from '../store/app.effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../reducers';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

@NgModule({
    imports: [
        EffectsModule.forRoot([
            AppEffects,
        ]),
        StoreModule.forRoot(reducers, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
            }
        }),
        StoreRouterConnectingModule.forRoot({
            routerState: RouterState.Minimal,
        }),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    ],
    exports: [
        EffectsModule,
        StoreModule,
        StoreRouterConnectingModule,
        StoreDevtoolsModule,
    ],
})
export class AppStoreModule {}
