import { Action, createReducer, on } from '@ngrx/store';

import * as SettingsActions from './settings.actions';

export interface State {
  email: string;
  loading: boolean;
  errorMessage: string;
  updateSuccessful: boolean;
  providers: string[];
}

export const initialState: State = {
  email: null,
  loading: false,
  errorMessage: null,
  updateSuccessful: false,
  providers: [],
};

const settingsReducer = createReducer(
  initialState,
  on(SettingsActions.loadSettingsSuccess, (state, action) => ({ ...state, email: action.email })),
  on(SettingsActions.updateSettingsStart, state => ({ ...state, loading: true, updateSuccessful: false })),
  on(SettingsActions.updateSettingsSuccess, (state, action) => ({ ...state, email: action.email, loading: false, errorMessage: null, updateSuccessful: true })),
  on(SettingsActions.updateSettingsFail, (state, action) => ({ ...state, loading: false, errorMessage: action.errorMessage })),
  on(SettingsActions.loadConnectedAccountsSuccess, (state, action) => ({ ...state, providers: action.providers })),
  on(SettingsActions.loadConnectedAccountsFail, (state, action) => ({ ...state, errorMessage: action.errorMessage })),
  on(SettingsActions.saveConnectedAccountFail, (state, action) => ({ ...state, errorMessage: action.errorMessage })),
  on(SettingsActions.deleteConnectedAccountFail, (state, action) => ({ ...state, errorMessage: action.errorMessage })),
);

export function reducer(state: State, action: Action) {
  return settingsReducer(state, action);
}
