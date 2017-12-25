import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ShareModule } from './share/share.module';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';

import { AppComponent } from './app.component';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ShareModule,
    CoreModule,
    LoginModule,
    ProjectModule,
    TaskModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
