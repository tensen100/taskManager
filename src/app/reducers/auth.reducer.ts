import { Auth } from '../domain/auth.model';
import { AuthActions, AuthActionTypes } from '../actions/auth.action';
import {State} from './quote.reducer';

export const initialState: Auth = {};

export function reducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
    case AuthActionTypes.REGISTER_SUCCESS: {
      return {...<Auth>action.payload};
    }
    case AuthActionTypes.LOGIN_FAIL:
    case AuthActionTypes.REGISTER_FAIL: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export const getAuth = (state: Auth) => state;
