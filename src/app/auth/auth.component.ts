import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../reducers/index';
import * as AuthActions from './store/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  public loginMode: boolean = true;
  public loading: boolean = false;
  public error: string = null;

  private storeSub: Subscription = null;

  constructor(private store: Store<fromApp.State>) {}

  ngOnInit() {

    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.loading = authState.loading;
      this.error = authState.authError;
    });

  }

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;

    if (this.loginMode) {
      this.store.dispatch(AuthActions.loginStart({ email, password }));
    } else {
      this.store.dispatch(AuthActions.signupStart({ email, password }));
    }

    form.reset();

  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

}
