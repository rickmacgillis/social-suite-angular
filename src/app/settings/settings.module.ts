import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { ConnectedAccountsComponent } from './connected-accounts/connected-accounts.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: "", component: SettingsComponent },
  { path: "connected-accounts", component: ConnectedAccountsComponent },
];

@NgModule({
  declarations: [
    SettingsComponent,
    ConnectedAccountsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class SettingsModule { }
