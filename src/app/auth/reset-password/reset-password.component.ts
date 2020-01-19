import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../../reducers';
import * as AuthActions from '../store/auth.actions';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  public loading: boolean = false;
  public error: string = null;
  public isSuccessful: boolean = false;

  private authSub: Subscription = null;

  constructor(private router: Router, private store: Store<fromApp.State>) {}

  ngOnInit() {

    this.authSub = this.store.select("auth").subscribe(authState => {

      this.error = authState.authError;
      this.loading = authState.loading;
      this.isSuccessful = authState.resetFinished;

    });

  }

  onGotoLogin() {
    this.router.navigate(['/auth']);
  }

  onSubmit(passForm: NgForm) {
    this.store.dispatch(AuthActions.resetPasswordStart({ email: passForm.value.email }));
  }

  ngOnDestroy() {
    
    if (this.authSub !== null) {
      this.authSub.unsubscribe();
    }

  }

}
