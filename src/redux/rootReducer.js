import { combineReducers } from 'redux';

import { appReducer } from './appReducer';
import { usersReducer } from './usersReducer';

export const rootReducer = combineReducers({
  users: usersReducer,
  app: appReducer
})
