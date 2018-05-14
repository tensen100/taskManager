import {Project, User} from '../domain';
import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';

export interface UserProject {
  user: User;
  projectId: string;
}

export interface UserTask {
  user: User;
  taskId: string;
}

export const UserActionTypes = {
  ADD_USER_PROJECT: type('[User] Add User Project'),
  ADD_USER_PROJECT_SUCCESS: type('[User] Add User Project Success'),
  ADD_USER_PROJECT_FAIL: type('[User] Add User Project Fail'),
  REMOVE_USER_PROJECT: type('[User] Remove User Project'),
  REMOVE_USER_PROJECT_SUCCESS: type('[User] Remove User Project Success'),
  REMOVE_USER_PROJECT_FAIL: type('[User] Remove User Project Fail'),
  BATCH_UPDATE_USER_PROJECT: type('[User] Batch Update User Project'),
  BATCH_UPDATE_USER_PROJECT_SUCCESS: type('[User] Batch Update User Project Success'),
  BATCH_UPDATE_USER_PROJECT_FAIL: type('[User] Batch Update User Project Fail'),
  SEARCH_USERS: type('[User] Search Users'),
  SEARCH_USERS_SUCCESS: type('[User] Search Users Success'),
  SEARCH_USERS_FAIL: type('[User] Search Users Fail'),
  LOAD_USERS_BY_PRJ: type('[User] Load Users By Projects'),
  LOAD_USERS_BY_PRJ_SUCCESS: type('[User] Load Users By Projects Success'),
  LOAD_USERS_BY_PRJ_FAIL: type('[User] Load Users By Projects Fail'),
};

export class UserAddUserProjectAction implements Action {
  type = UserActionTypes.ADD_USER_PROJECT;
  constructor(public payload: UserProject) {}
}

export class UserAddUserProjectSuccessAction implements Action {
  type = UserActionTypes.ADD_USER_PROJECT_SUCCESS;
  constructor(public payload: User) {}
}

export class UserAddUserProjectFailAction implements Action {
  type = UserActionTypes.ADD_USER_PROJECT_FAIL;
  constructor(public payload: string) {}
}

export class UserRemoveUserProjectAction implements Action {
  type = UserActionTypes.REMOVE_USER_PROJECT;
  constructor(public payload: UserProject) {}
}

export class UserRemoveUserProjectSuccessAction implements Action {
  type = UserActionTypes.REMOVE_USER_PROJECT_SUCCESS;
  constructor(public payload: User) {}
}

export class UserRemoveUserProjectFailAction implements Action {
  type = UserActionTypes.REMOVE_USER_PROJECT_FAIL;
  constructor(public payload: string) {}
}

export class UserBatchUpdateUserProjectAction implements Action {
  type = UserActionTypes.BATCH_UPDATE_USER_PROJECT;
  constructor(public payload: Project) {}
}

export class UserBatchUpdateUserProjectSuccessAction implements Action {
  type = UserActionTypes.BATCH_UPDATE_USER_PROJECT_SUCCESS;
  constructor(public payload: User[]) {}
}

export class UserBatchUpdateUserProjectFailAction implements Action {
  type = UserActionTypes.BATCH_UPDATE_USER_PROJECT_FAIL;
  constructor(public payload: string) {}
}

export class UserSearchUsersAction implements Action {
  type = UserActionTypes.SEARCH_USERS;
  constructor(public payload: string) {}
}

export class UserSearchUsersSuccessAction implements Action {
  type = UserActionTypes.SEARCH_USERS_SUCCESS;
  constructor(public payload: User[]) {}
}

export class UserSearchUsersFailAction implements Action {
  type = UserActionTypes.SEARCH_USERS_FAIL;
  constructor(public payload: string) {}
}

export class UserLoadUsersByPrjAction implements Action {
  type = UserActionTypes.LOAD_USERS_BY_PRJ;
  constructor(public payload: string) {}
}

export class UserLoadUsersByPrjSuccessAction implements Action {
  type = UserActionTypes.LOAD_USERS_BY_PRJ_SUCCESS;
  constructor(public payload: User[]) {}
}

export class UserLoadUsersByPrjFailAction implements Action {
  type = UserActionTypes.LOAD_USERS_BY_PRJ_FAIL;
  constructor(public payload: string) {}
}

export type UserActions
  = UserAddUserProjectAction
  | UserAddUserProjectSuccessAction
  | UserAddUserProjectFailAction
  | UserSearchUsersAction
  | UserSearchUsersSuccessAction
  | UserSearchUsersFailAction
  | UserRemoveUserProjectAction
  | UserRemoveUserProjectSuccessAction
  | UserRemoveUserProjectFailAction
  | UserBatchUpdateUserProjectAction
  | UserBatchUpdateUserProjectSuccessAction
  | UserBatchUpdateUserProjectFailAction
  | UserLoadUsersByPrjAction
  | UserLoadUsersByPrjSuccessAction
  | UserLoadUsersByPrjFailAction;
