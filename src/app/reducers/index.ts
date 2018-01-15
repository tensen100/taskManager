import { NgModule } from '@angular/core';
import { ActionReducer, combineReducers, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromQuote from './quote.reducer';
import { compose } from '@ngrx/core/compose';
import { environment } from '../../environments/environment';

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
const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducers: ActionReducer<State> = combineReducers(reducers);
export function reducer( state = initialState, action: any): State {
  return environment.production ? productionReducers(state, action) : developmentReducers(state, action);
}
@NgModule({
  imports: [
    StoreModule.forRoot(reducer)
  ]
})
export class AppStoreModule { }
