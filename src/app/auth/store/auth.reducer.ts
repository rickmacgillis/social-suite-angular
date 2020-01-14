import { Action, createReducer, on } from '@ngrx/store';
import { UserToken } from '../user-token.model';
import * as AuthActions from './auth.actions';

export interface State {
    userToken: UserToken;
    authError: string;
    loading: boolean;
};

const initialState: State = {
    userToken: null,
    authError: null,
    loading: false,
};

export function authReducer(authState: State, authAction: Action) {

    const reducer = createReducer(
        initialState,
        on(AuthActions.loginStart, AuthActions.signupStart, state => ({...state, authError: null, loading: true})),
        on(AuthActions.authenticateSuccess, (state, action) => ({ ...state, authError: null, loading: false, userToken: new UserToken(action.token, action.expirationDate) })),
        on(AuthActions.authenticateFail, (state, action) => ({ ...state, userToken: null, authError: action.errorMessage, loading: false })),
        on(AuthActions.logout, state => ({ ...state, userToken: null })),
        on(AuthActions.clearError, state => ({ ...state, authError: null }))
    );

    return reducer(authState, authAction);

}
