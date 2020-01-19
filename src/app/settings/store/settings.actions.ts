import { createAction, props } from '@ngrx/store';

export const loadSettings = createAction('[Settings] Load Settings');
export const loadSettingsSuccess = createAction('[Settings] Load Settings Success', props<{ email: string }>());
export const updateSettingsStart = createAction('[Settings] Update Settings Start', props<{ email: string, password?: string }>());
export const updateSettingsSuccess = createAction('[Settings] Update Settings Success', props<{ email: string }>());
export const updateSettingsFail = createAction('[Settings] Update Settings Fail', props<{ errorMessage: string }>());
