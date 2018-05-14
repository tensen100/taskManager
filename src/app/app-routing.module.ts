import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './service/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'project',
    redirectTo: '/project',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'tasklists',
    redirectTo: '/tasklists',
    pathMatch: 'full',
    canActivate: [AuthGuard]

  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
