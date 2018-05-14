import { User } from '../domain';
import { Auth } from '../domain/auth.model';
import { coverArrToObj } from '../utils/render.util';
import * as UserActions from '../actions/user.action';
import * as AuthActions from '../actions/auth.action';
import {createSelector} from '@ngrx/store';

export interface State {
  ids: string[];
  entities: {[id: string]: User};
}

export const initialState: State = {
  ids: [],
  entities: {}
};

const register = (state, action) => {
  const auth = <Auth>action.payload;
  if (state.ids.indexOf(auth.userId) > -1) {
    return {...state, entities: {...state.entities, [auth.user.id]: auth.user}};
  }else {
    return {
      ids: [...state.ids, auth.user.id],
      entities: {...state.entities, [auth.user.id]: auth.user}
    };
  }
};

const addProjectRef = (state, action) => {
  const  user = <User>action.payload;
  const ids = [...state.ids, user.id];
  const entities = {...state.entities, [user.id]: user};
  if (state.entities[user.id]) {
    return {...state, entities: entities};
  }else {
    return {...state, ids: ids, entities: entities};
  }
};

const removeProject = (state, action) => {
  const user = <User>action.payload;
  if (!state.entities[user.id]) {
    return state;
  }else {
    return {...state, entities: {...state.entities, [user.id]: user}};
  }
};

const searchUsers = (state, action) => {
  const users = <User[]>action.payload;
  if (users === null) {
    return state;
  }
  const newUsers = users.filter(user => !state.entities[user.id]);
  const newIds = newUsers.map(user => user.id);
  if (newIds.length === 0) {
    return state;
  }
  const newEntities = coverArrToObj(newUsers);
  return{
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities}
  };
};

const loadByProject = (state, action) => {
  const users = <User[]>action.payload;
  if (users === null) {
    return state;
  }
  const newUsers = users.filter(user => !state.entities[user.id]);
  const newIds = newUsers.map(user => user.id);
  if (newIds.length === 0) {
    return state;
  }
  const newEntities = coverArrToObj(newIds);
  return {
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities}
  };
};

const batchUpdateProjectRef = (state, action) => {
  const users = <User[]>action.payload;
  const userProjects = coverArrToObj(users);
  const newEntites = {...state.entities, ...userProjects};
  return {...state, entities: newEntites};
};

export function reducer (state = initialState, action: UserActions.UserActions | AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.AuthActionTypes.LOGIN_SUCCESS:
    case AuthActions.AuthActionTypes.REGISTER_SUCCESS: {
      return register(state, action);
    }
    case UserActions.UserActionTypes.ADD_USER_PROJECT_SUCCESS: {
      return addProjectRef(state, action);
    }
    case UserActions.UserActionTypes.REMOVE_USER_PROJECT_SUCCESS: {
      return removeProject(state, action);
    }
    case UserActions.UserActionTypes.SEARCH_USERS_SUCCESS: {
      return searchUsers(state, action);
    }
    case UserActions.UserActionTypes.LOAD_USERS_BY_PRJ_SUCCESS: {
      return loadByProject(state, action);
    }
    case UserActions.UserActionTypes.BATCH_UPDATE_USER_PROJECT_SUCCESS: {
      return batchUpdateProjectRef(state, action);
    }
    default: {
      return state;
    }
  }
}

export const getEntities = (state) => state.entities;
export const getIds = (state) => state.ids;
export const getUsers = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
