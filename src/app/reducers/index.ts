import { NgModule } from '@angular/core';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { createSelector } from 'reselect';

import * as fromQuote from './quote.reducer';
import * as fromAuth from './auth.reducer';
import * as fromProject from './project.reducer';
import * as fromUser from './user.reducer';

import { Auth } from '../domain/auth.model';


// 定义全局State,包含所有的State
export interface State {
  quote: fromQuote.State;
  auth: Auth;
  projects: fromProject.State;
  users: fromUser.State;
}
const initialState: State = {
  quote: fromQuote.initialState,
  auth: fromAuth.initialState,
  projects: fromProject.InitialState,
  users: fromUser.initialState,
};
// 字典
const reducers = {
  quote: fromQuote.reducer,
  auth: fromAuth.reducer,
  projects: fromProject.reducer,
  user: fromUser.reducer
};

// const logger = (reducer: ActionReducer<State>): ActionReducer<State> =>  {
//   return function(state: State, action: any): State {
//     console.log('state', state);
//     console.log('action', action);
//     return reducer(state, action);
//   };
// };
// export const metaReducers: MetaReducer<State>[] = !environment.production
//   ? [logger, storeFreeze]
//   : [];

export const getQuoteState = (state: State) => state.quote;
export const getAuthState = (state: State) => state.auth;
export const getProjectState = (state: State) => state.projects;
export const getUserState = (state: State) => state.users;

const getCurrentAuth = createSelector(getAuthState, fromAuth.getAuth);
const getUserEntities = createSelector(getUserState, fromUser.getEntities);

export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);
export const getProjects = createSelector(getProjectState, fromProject.getAll);
export const getAuth = createSelector(getCurrentAuth, getUserEntities, (_auth: Auth, _entities) => {
  console.log(_auth);
  console.log(_entities);
  return {..._auth, user: _entities[_auth.userId]};
});
@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
  ]
})
export class AppStoreModule { }
