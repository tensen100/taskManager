import {Project} from '../domain';
import {ProjectActions, ProjectActionTypes} from '../actions/project.action';
import * as _ from 'lodash';
import {createSelector} from '@ngrx/store';

export interface State {
  ids: string[];
  entities: {[id: string]: Project};
  selectedId: string | null;
}

 export const InitialState: State = {
  ids: [],
  entities: {},
  selectedId: null,
};
const addProject = (state, action) => {
  const project = action.payload;
  if (state.entities[project.id]) {
    return state;
  }
  const ids = [...state.ids, project.id];
  const entities = {...state.entities, [project.id]: project};
  return {...state, ids: ids, entities: entities};
};

const updateProject = (state, action) => {
  const project = action.payload;
  const entities = {...state.entities, [project.id]: project};
  return {...state, entities: entities};
};

const delProject = (state, action) => {
  const project = action.payload;
  const newIds = state.ids.filter(id => id !== project.id);
  const newEntities = newIds.reduce((entities, id: string) => ({...entities, [id]: state.entities[id]}));
  return {
    ids: newIds,
    entities: newEntities,
    selectedId: null
  };
};

const loadProject = (state, action) => {
  const projects = action.payload;
  const incomingIds = projects.map(p => p.id);
  const incomingEntities = _.chain(projects)
    .keyBy('id')
    .mapValues(o => o)
    .value();
  const newIds = _.difference(incomingIds, state.ids);
  const newEntities = newIds.reduce((entities, id: string) => ({...entities, [id]: incomingIds}), {});
  return {
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities},
    selectedId: null
  };
};
export function reducer(state = InitialState, action: ProjectActions) {
  switch (action.type) {
    case ProjectActionTypes.ADD_SUCCESS: {
      return addProject(state, action);
    }
    case ProjectActionTypes.DELETE_SUCCESS: {
      return delProject(state, action);
    }
    case ProjectActionTypes.UPDATE_SUCCESS: {
      return updateProject(state, action);
    }
    case ProjectActionTypes.LOAD_SUCCESS: {
      return loadProject(state, action);
    }
    case ProjectActionTypes.SELECT: {
      return {...state, selectedId: (<Project>action.payload).id};
    }
    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedId = (state: State) => state.selectedId;
export const getAll = createSelector(getIds, getEntities, (ids, entities) => {
  return ids.map(id => entities[id]);
});
