import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromSettings from '../settings/store/settings.reducer';

export interface State {
  auth: fromAuth.State;
  settings: fromSettings.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.authReducer,
  settings: fromSettings.reducer,
};
