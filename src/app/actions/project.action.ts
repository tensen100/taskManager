import {type} from '../utils/type.util';
import {Action} from '@ngrx/store';
import {Project, User} from '../domain';

export const ProjectActionTypes = {
  ADD: type('[project] Add'),
  ADD_SUCCESS: type('[project] Add Success'),
  ADD_FAIL: type('[project] Add Fail'),
  UPDATE: type('[project] Update'),
  UPDATE_SUCCESS: type('[project] Update Success'),
  UPDATE_FAIL: type('[project] Update Fail'),
  DELETE: type('[project] Delete'),
  DELETE_SUCCESS: type('[project] Delete Success'),
  DELETE_FAIL: type('[project] Delete Fail'),
  LOAD: type('[project] Load'),
  LOAD_SUCCESS: type('[project] Load Success'),
  LOAD_FAIL: type('[project] Load Fail'),
  INVITE: type('[project] Invite'),
  INVITE_SUCCESS: type('[project] Invite Success'),
  INVITE_FAIL: type('[project] Invite Fail'),
  SELECT: type('[project] Select')
};

/**
 * add
 */
export class ProjectAddAction implements Action {
  type = ProjectActionTypes.ADD;
  constructor(public payload: Project) {}
}

export class ProjectAddSuccessAction implements Action {
  type = ProjectActionTypes.ADD_SUCCESS;
  constructor(public payload: Project) {}
}

export class ProjectAddFailAction implements Action {
  type = ProjectActionTypes.ADD_FAIL;
  constructor(public payload: string) {}
}

/**
 * update
 */
export class ProjectUpdateAction implements Action {
  type = ProjectActionTypes.UPDATE;
  constructor(public payload: Project) {}
}
export class ProjectUpdateSuccessAction implements Action {
  type = ProjectActionTypes.UPDATE_SUCCESS;
  constructor(public payload: Project) {}
}
export class ProjectUpdateFailAction implements Action {
  type = ProjectActionTypes.UPDATE_FAIL;
  constructor(public payload: string) {}
}

/**
 * delete
 */
export class ProjectDeleteAction implements Action {
  type = ProjectActionTypes.DELETE;
  constructor(public payload: Project) {}
}
export class ProjectDeleteSuccessAction implements Action {
  type = ProjectActionTypes.DELETE_SUCCESS;
  constructor(public payload: Project) {}
}
export class ProjectDeleteFailAction implements Action {
  type = ProjectActionTypes.DELETE_FAIL;
  constructor(public payload: string) {}
}

/**
 * load
 */
export class ProjectLoadAction implements Action {
  type = ProjectActionTypes.LOAD;
  constructor(public payload: null) {}
}
export class ProjectLoadSuccessAction implements Action {
  type = ProjectActionTypes.LOAD_SUCCESS;
  constructor(public payload: Project) {}
}
export class ProjectLoadFailAction implements Action {
  type = ProjectActionTypes.LOAD_FAIL;
  constructor(public payload: string) {}
}

/**
 * invite
 */
export class ProjectInviteAction implements Action {
  type = ProjectActionTypes.INVITE;
  constructor(public payload: {projectId: string; members: User[]}) {}
}
export class ProjectInviteSuccessAction implements Action {
  type = ProjectActionTypes.INVITE_SUCCESS;
  constructor(public payload: Project) {}
}
export class ProjectInviteFailAction implements Action {
  type = ProjectActionTypes.INVITE_FAIL;
  constructor(public payload: string) {}
}

/**
 * selected
 */
export class ProjectSelectAction implements Action {
  type = ProjectActionTypes.SELECT;
  constructor(public payload: Project) {}
}

export type ProjectActions =
  ProjectAddAction |
  ProjectAddSuccessAction |
  ProjectAddFailAction |
  ProjectUpdateAction |
  ProjectUpdateSuccessAction |
  ProjectUpdateFailAction |
  ProjectDeleteAction |
  ProjectDeleteSuccessAction |
  ProjectDeleteFailAction |
  ProjectLoadAction |
  ProjectLoadSuccessAction |
  ProjectLoadFailAction |
  ProjectInviteAction |
  ProjectInviteSuccessAction |
  ProjectInviteFailAction |
  ProjectSelectAction;


