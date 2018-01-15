import { NgModule } from '@angular/core';
import { ActionReducer, combineReducers, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromQuote from './quote.reducer';
import { compose } from '@ngrx/core/compose';
import { environment } from '../../environments/environment';
import {StoreRouterConnectingModule} from '@ngrx/router-store';

// import { reducer } from './quote.reducer';

// 定义全局State,包含所有的State
export interface State {
  quote: fromQuote.State;
}
const initialState: State = {
  quote: fromQuote.initialState,
};
// 字典
const reducers = {
  quote: fromQuote.reducer,
};

const logger = (reducer: ActionReducer<State>): ActionReducer<State> =>  {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
};
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze]
  : [];
// const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
// const productionReducers: ActionReducer<State> = combineReducers(reducers);
// export function reducer( state = initialState, action: any): State {
//   return environment.production ? productionReducers(state, action) : developmentReducers(state, action);
// }
@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    // StoreRouterConnectingModule.forRoot({
    //   stateKey: 'router',
    // }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
  ]
})
export class AppStoreModule { }
