import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../reducers';
import * as SettingsActions from './store/settings.actions';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  public loading: boolean = false;
  public error: string = null;
  public email: string = null;
  public updateSuccessful: boolean = false;

  private settingsSub: Subscription = null;

  constructor(private store: Store<fromApp.State>) {}

  ngOnInit() {

    this.settingsSub = this.store.select("settings").subscribe(settingsState => {
      this.email = settingsState.email;
      this.error = settingsState.errorMessage;
      this.loading = settingsState.loading;
      this.updateSuccessful = settingsState.updateSuccessful;
    });

    this.store.dispatch(SettingsActions.loadSettings());

  }

  onSubmit(settingsForm: NgForm) {

    const email = settingsForm.value.email;
    const password = settingsForm.value.password;

    let props = { email };
    if (password) {
      props['password'] = password;
    }
    
    this.store.dispatch(SettingsActions.updateSettingsStart(props));

  }

  ngOnDestroy() {
    
    if (this.settingsSub !== null) {
      this.settingsSub.unsubscribe();
    }

  }

}
