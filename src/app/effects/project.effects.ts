import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ProjectService } from '../service/project.service';
import * as fromRoot from '../reducers';
import * as ProjectActions from '../actions/project.action';
import {Project} from '../domain';

@Injectable()
export class ProjectEffects {
  @Effect()
  loadProject$: Observable<Action> = this.action$
    .ofType(ProjectActions.ProjectActionTypes.LOAD)
    .debug(msg => console.log(msg))
    .withLatestFrom(this.store$.select(fromRoot.getAuth))
    .switchMap(([_, auth]) => this.service$
      .get(auth.user.id)
      .map(projects => new ProjectActions.ProjectLoadSuccessAction(projects))
      .catch(err => Observable.of(new ProjectActions.ProjectLoadFailAction(JSON.stringify(err))))
    );

  @Effect()
  addProject$: Observable<Action> = this.action$
    .ofType(ProjectActions.ProjectActionTypes.ADD)
    .map((action: ProjectActions.ProjectAddAction) => action.payload)
    .withLatestFrom(this.store$.select(fromRoot.getAuth))
    .switchMap(([project, auth]) => {
      const added = <Project>{...project, members: [`${auth.user.id}`]};
      return this.service$.add(added)
        .map(projects => new ProjectActions.ProjectAddSuccessAction(projects))
        .catch(err => Observable.of(new ProjectActions.ProjectAddFailAction(JSON.stringify(err))));
    });

  @Effect()
  updateProject$: Observable<Action> = this.action$
    .ofType(ProjectActions.ProjectActionTypes.UPDATE)
    .map((action: ProjectActions.ProjectUpdateAction) => action.payload)
    .switchMap(project => this.service$
      .update(project)
      .map(v => new ProjectActions.ProjectUpdateSuccessAction(v))
      .catch(err => Observable.of(new ProjectActions.ProjectUpdateFailAction(JSON.stringify(err))))
    );

  @Effect()
  delProject$: Observable<Action> = this.action$
    .ofType(ProjectActions.ProjectActionTypes.DELETE)
    .map((action: ProjectActions.ProjectDeleteAction) => action.payload)
    .switchMap(project => this.service$
      .del(project)
      .map(v => new ProjectActions.ProjectDeleteSuccessAction(v))
      .catch(err => Observable.of(new ProjectActions.ProjectDeleteFailAction(JSON.stringify(err))))
    );

  @Effect()
  inviteProject$: Observable<Action> = this.action$
    .ofType(ProjectActions.ProjectActionTypes.INVITE)
    .map((action: ProjectActions.ProjectInviteAction) => action.payload)
    .switchMap(({projectId, members}) => this.service$.invite(projectId, members)
      .map(project => new ProjectActions.ProjectInviteSuccessAction(project))
      .catch(err => Observable.of(new ProjectActions.ProjectInviteFailAction(JSON.stringify(err))))
    );
  constructor(
    private action$: Actions,
    private service$: ProjectService,
    private store$: Store<fromRoot.State>,
    private  router: Router) {}
}
