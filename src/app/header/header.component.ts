import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../reducers';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public collapsed: boolean = true;
  public isAuthenticated: boolean = false;

  constructor(private store: Store<fromApp.State>) {}

  ngOnInit() {

    this.store.select('auth').subscribe(authState => {
      this.isAuthenticated = !!authState.userToken;
    });

  }

  onClickCheeseburger() {
    this.collapsed = !this.collapsed;
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }

}
