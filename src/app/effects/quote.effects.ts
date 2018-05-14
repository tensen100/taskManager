import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { LoadAction, LoadFailAction, LoadSuccessAction, QuoteActionTypes } from '../actions/quote.action';
import { QuoteService } from '../service/quote.service';

@Injectable()
export class QuoteEffects {
  @Effect()
  quote$: Observable<Action> = this.actions$
    .ofType(QuoteActionTypes.LOAD)
    .map((action: LoadAction) => action.payload)
    .switchMap(_ => this.service$.getQuote()
      .map(q => new LoadSuccessAction(q))
      .catch(err => Observable.of(new LoadFailAction(JSON.stringify(err)))));

  constructor(private actions$: Actions, private service$: QuoteService) {}
}
