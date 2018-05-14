import { NgModule, SkipSelf, Optional } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ShareModule } from '../share/share.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { ServiceModule } from '../service/service.module';
import { AppStoreModule } from '../reducers';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import 'hammerjs';

import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/withLatestFrom';

import '../utils/debug.util';
import { loadSvgResources } from '../utils/svg.util';
import { EffectsModule } from '@ngrx/effects';
import { QuoteEffects } from '../effects/quote.effects';
import { AuthEffects } from '../effects/auth.effects';
import { ProjectEffects } from '../effects/project.effects';

@NgModule({
  imports: [
    HttpClientModule,
    HttpModule,
    ShareModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceModule.forRoot(),
    AppStoreModule,
    EffectsModule.forRoot([QuoteEffects, AuthEffects, ProjectEffects])
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppRoutingModule
  ],
  providers: [
    {
      provide: 'BASE_CONFIG',
      useValue: {
        uri: 'http://localhost:3000'
      }
    }
  ]
})
/**
 * 核心模块
 */
export class CoreModule {
  // coreModule 只加载一次
  //  @SkipSelf() 避免死循环
  // @Optional() 首次加载
  constructor(
    @SkipSelf() @Optional() parent: CoreModule,
    ir: MatIconRegistry,
    ds: DomSanitizer
  ) {
    if (parent) {
      throw new Error('模块已经存在，不能再次加载');
    }
    loadSvgResources(ir, ds);
  }
}
