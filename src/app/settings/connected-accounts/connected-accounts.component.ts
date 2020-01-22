import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../../reducers';
import * as SettingsActions from '../store/settings.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-connected-accounts',
  templateUrl: './connected-accounts.component.html',
  styleUrls: ['./connected-accounts.component.scss']
})
export class ConnectedAccountsComponent implements OnInit, OnDestroy {

  public connectFail: boolean = false;
  public success: boolean = false;
  public error: string = null;
  public providers: string[] = [];
  public loaded: boolean = false;

  private settingsSub: Subscription = null;
  private queryParamsSub: Subscription = null;
  private queryParams: Params = null;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromApp.State>) { }

  ngOnInit() {

    this.queryParamsSub = this.route.queryParams.subscribe((params: Params) => {
      this.queryParams = params;
      this.connectFail = !!params.failed;
      this.success = !!params.success;
    });
    
    this.settingsSub = this.store.select("settings").subscribe(state => {
      this.error = state.errorMessage;
      this.providers = state.providers;
      this.loaded = true;
    });

    this.handleConnectionCallback();
    this.store.dispatch(SettingsActions.loadConnectedAccounts());

  }

  onConnect(provider: string) {
    window.location.href = environment.apiBaseUrl + '/accounts/connect/' + provider;
  }

  onDisconnect(provider: string) {
    this.store.dispatch(SettingsActions.deleteConnectedAccount({ provider }));
    this.router.navigateByUrl('/settings/connected-accounts');
  }

  handleConnectionCallback() {

    const code = this.queryParams.code;
    const secret = this.queryParams.secret;
    const provider = this.queryParams.provider;
    if (code && provider) {
      this.store.dispatch(SettingsActions.saveConnectedAccount({ provider, code, secret }));
    }

  }

  ngOnDestroy() {
    this.settingsSub.unsubscribe();
    this.queryParamsSub.unsubscribe();
  }

}
