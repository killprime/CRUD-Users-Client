import {
  AXIOS_USERS,
  DISABLE_BUTTONS,
  DISABLE_PAG,
  EDIT_STATE_BUTTONS,
  ENABLE_PAG,
  IS_DELETE,
  SET_PARAM_PAGINATION
} from './types';

const initialState = {
  axiosUsers: [],
  buttons: [],
  paramPagination: {
    perPage: 3,
    currentPage: 1,
    total: 0
  },
  disablePaginate: false,
  isDelete: false,
  disableButtons: false,
}

export const usersReducer = (state = initialState, action) => {
  switch (action.type){
    case AXIOS_USERS:
      return {...state, axiosUsers: action.payload}
    case SET_PARAM_PAGINATION:
      return {...state, paramPagination: action.payload}
    case DISABLE_PAG:
      return {...state, disablePaginate: true}
    case ENABLE_PAG:
      return {...state, disablePaginate: false}
    case EDIT_STATE_BUTTONS:
      return {...state, buttons: action.payload}
    case IS_DELETE:
      return {...state, isDelete: action.payload}
    case DISABLE_BUTTONS:
      return {...state, disableButtons: action.payload}
    default: return state
  }
}
