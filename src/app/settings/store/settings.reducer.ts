import { Action, createReducer, on } from '@ngrx/store';

import * as SettingsActions from './settings.actions';

export interface State {
  email: string;
  loading: boolean;
  errorMessage: string;
  updateSuccessful: boolean;
}

export const initialState: State = {
  email: null,
  loading: false,
  errorMessage: null,
  updateSuccessful: false,
};

const settingsReducer = createReducer(
  initialState,
  on(SettingsActions.loadSettings, state => ({ ...state })),
  on(SettingsActions.loadSettingsSuccess, (state, action) => ({ ...state, email: action.email })),
  on(SettingsActions.updateSettingsStart, state => ({ ...state, loading: true, updateSuccessful: false })),
  on(SettingsActions.updateSettingsSuccess, (state, action) => ({ ...state, email: action.email, loading: false, errorMessage: null, updateSuccessful: true })),
  on(SettingsActions.updateSettingsFail, (state, action) => ({ ...state, loading: false, errorMessage: action.errorMessage }))
);

export function reducer(state: State, action: Action) {
  return settingsReducer(state, action);
}
