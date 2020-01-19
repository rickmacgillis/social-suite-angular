import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../reducers';
import * as AuthActions from '../store/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password-confirm',
  templateUrl: './reset-password-confirm.component.html',
  styleUrls: ['./reset-password-confirm.component.scss']
})
export class ResetPasswordConfirmComponent implements OnInit, OnDestroy {

  public loading: boolean = false;
  public error: string = null;
  public isSuccessful: boolean = false;
  public token: string = null;

  private authSub: Subscription = null;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromApp.State>) { }

  ngOnInit() {
    
    this.token = this.route.snapshot.queryParams.token;
    this.authSub = this.store.select("auth").subscribe(authState => {

      this.loading = authState.loading;
      this.error = authState.authError;
      this.isSuccessful = authState.resetFinished;

    });

  }

  onSubmit(passForm: NgForm) {

    this.store.dispatch(AuthActions.resetPasswordConfirmStart({
      password: passForm.value.password,
      token: this.token,
    }));

  }

  onGotoPasswordReset() {
    this.router.navigate(['/auth', 'reset-password']);
  }

  onGotoLogin() {
    this.router.navigate(['/auth']);
  }

  ngOnDestroy() {

    if (this.authSub !== null) {
      this.authSub.unsubscribe();
    }

  }

}
