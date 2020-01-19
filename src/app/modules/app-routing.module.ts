import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from '../auth/auth.guard';
import { LoginRedirectGuard } from '../auth/login-redirect.guard';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "dashboard" },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: "auth",
    canActivate: [LoginRedirectGuard],
    loadChildren: () => import('../auth/auth.module').then(module => module.AuthModule),
  },
  {
    path: "settings",
    canActivate: [AuthGuard],
    loadChildren: () => import('../settings/settings.module').then(module => module.SettingsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
