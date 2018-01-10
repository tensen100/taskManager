import {ModuleWithProviders, NgModule} from '@angular/core';
import { QuoteService } from './quote.service';

@NgModule({})
export class ServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServiceModule,
      providers: [
        QuoteService
      ]
    };
  }
}