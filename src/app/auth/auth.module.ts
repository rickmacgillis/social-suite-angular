import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginRedirectGuard } from './login-redirect.guard';
import { ResetPasswordConfirmComponent } from './reset-password-confirm/reset-password-confirm.component';

const routes: Routes = [
    {
        path: "",
        canActivate: [LoginRedirectGuard],
        children: [
            { path: "", component: AuthComponent },
            { path: "reset-password", component: ResetPasswordComponent },
            { path: "reset-password-confirm", component: ResetPasswordConfirmComponent },
        ]
    },
];

@NgModule({
    declarations: [
        AuthComponent,
        ResetPasswordComponent,
        ResetPasswordConfirmComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        EffectsModule.forFeature([
            AuthEffects,
        ]),
        RouterModule.forChild(routes),
    ],
    exports: [
        EffectsModule,
        RouterModule,
    ],
})
export class AuthModule {}
