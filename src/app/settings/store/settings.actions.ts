import { createAction, props } from '@ngrx/store';

export const loadSettings = createAction('[Settings] Load Settings');
export const loadSettingsSuccess = createAction('[Settings] Load Settings Success', props<{ email: string }>());
export const updateSettingsStart = createAction('[Settings] Update Settings Start', props<{ email: string, password?: string }>());
export const updateSettingsSuccess = createAction('[Settings] Update Settings Success', props<{ email: string }>());
export const updateSettingsFail = createAction('[Settings] Update Settings Fail', props<{ errorMessage: string }>());

export const loadConnectedAccounts = createAction('[Settings] Load Connected Accounts');
export const loadConnectedAccountsSuccess = createAction('[Settings] Load Connected Accounts Success', props<{ providers: string[] }>());
export const loadConnectedAccountsFail = createAction('[Settings] Load Connected Accounts Fail', props<{ errorMessage: string }>());

export const saveConnectedAccount = createAction('[Settings] Save Connected Account', props<{ provider: string, code: string, secret?: string }>());
export const saveConnectedAccountSuccess = createAction('[Settings] Save Connected Account Success');
export const saveConnectedAccountFail = createAction('[Settings] Save Connected Account Fail', props<{ errorMessage: string }>());

export const deleteConnectedAccount = createAction('[Settings] Delete Connected Account', props<{ provider: string }>());
export const deleteConnectedAccountSuccess = createAction('[Settings] Delete Connected Account Success');
export const deleteConnectedAccountFail = createAction('[Settings] Delete Connected Account Fail', props<{ errorMessage: string }>());
