import { Action, createReducer, on } from '@ngrx/store';
import { UserToken } from '../user-token.model';
import * as AuthActions from './auth.actions';

export interface State {
    userToken: UserToken;
    authError: string;
    loading: boolean;
    resetFinished: boolean;
};

const initialState: State = {
    userToken: null,
    authError: null,
    loading: false,
    resetFinished: false,
};

export function authReducer(authState: State, authAction: Action) {

    const reducer = createReducer(
        initialState,
        on(AuthActions.loginStart, AuthActions.signupStart, state => ({...state, authError: null, loading: true})),
        on(AuthActions.authenticateSuccess, (state, action) => ({ ...state, authError: null, loading: false, userToken: new UserToken(action.token, action.expirationDate) })),
        on(AuthActions.authenticateFail, (state, action) => ({ ...state, userToken: null, authError: action.errorMessage, loading: false })),
        on(AuthActions.logout, state => ({ ...state })),
        on(AuthActions.logoutEnd, state => ({ ...state, userToken: null })),
        on(AuthActions.resetPasswordStart, state => ({ ...state, loading: true, resetFinished: false, authError: null })),
        on(AuthActions.resetPasswordSuccess, state => ({ ...state, loading: false, resetFinished: true })),
        on(AuthActions.resetPasswordFailure, (state, action) => ({ ...state, loading: false, authError: action.errorMessage })),
        on(AuthActions.resetPasswordConfirmStart, state => ({ ...state, loading: true, resetFinished: false, authError: null })),
        on(AuthActions.resetPasswordConfirmSuccess, state => ({ ...state, loading: false, resetFinished: true })),
        on(AuthActions.resetPasswordConfirmFailure, (state, action) => ({ ...state, loading: false, authError: action.errorMessage }))
    );

    return reducer(authState, authAction);

}
