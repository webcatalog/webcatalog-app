import { combineReducers } from 'redux';

import { INSTALLING } from '../../constants/app-statuses';
import {
  SET_APP,
  REMOVE_APP,
  CLEAN_APP_MANAGEMENT,
  SET_SCANNING_FOR_INSTALLED,
} from '../../constants/actions';

const apps = (state = {}, action) => {
  switch (action.type) {
    case CLEAN_APP_MANAGEMENT: {
      // keep apps which are in installing/updating state
      const overwritingState = {};
      Object.keys(state).forEach((id) => {
        if (state[id].status === INSTALLING) {
          overwritingState[id] = state[id];
        }
      });

      return overwritingState;
    }
    case SET_APP: {
      const overwritingState = {};
      overwritingState[action.id] = { ...(state[action.id] || {}), ...action.app };

      return { ...state, ...overwritingState };
    }
    case REMOVE_APP: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    default: return state;
  }
};

const scanning = (state = true, action) => {
  switch (action.type) {
    case CLEAN_APP_MANAGEMENT: return true;
    case SET_SCANNING_FOR_INSTALLED: return action.scanning;
    default: return state;
  }
};

export default combineReducers({
  apps,
  scanning,
});
