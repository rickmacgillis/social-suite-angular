import {createAction, props} from '@ngrx/store';

export const loginStart = createAction('[Auth] Login Start', props<{ email: string, password: string }>());
export const signupStart = createAction('[Auth] Signup Start', props<{ email: string, password: string }>());
export const authenticateSuccess = createAction('[Auth] Auth Success', props<{ token: string, expirationDate: Date; redirect: boolean }>());
export const authenticateFail = createAction('[Auth] Auth Fail', props<{ errorMessage: string }>());
export const autoLogin = createAction('[Auth] Auto Login');
export const logout = createAction('[Auth] Logout');
export const logoutEnd = createAction('[Auth] Logout End');
export const resetPasswordStart = createAction('[Auth] Reset Password Start', props<{ email: string }>());
export const resetPasswordSuccess = createAction('[Auth] Reset Password Success');
export const resetPasswordFailure = createAction('[Auth] Reset Password Fail', props<{ errorMessage: string }>());
export const resetPasswordConfirmStart = createAction('[Auth] Reset Password Confirm Start', props<{ password: string, token: string }>());
export const resetPasswordConfirmSuccess = createAction('[Auth] Reset Password Confirm Success');
export const resetPasswordConfirmFailure = createAction('[Auth] Reset Password Confirm Fail', props<{ errorMessage: string }>());
