import axios from 'axios';

import {
  AXIOS_USERS,
  CREATE_USER,
  DISABLE_BUTTONS,
  DISABLE_PAG,
  EDIT_STATE_BUTTONS,
  ENABLE_PAG,
  HIDE_ALERT,
  HIDE_LOADER,
  IS_DELETE,
  SET_PARAM_PAGINATION,
  SHOW_ALERT,
  SHOW_LOADER
} from './types';

import { SETTING_API_URL } from '../settings.js';

export function setStateDisableButtons(state)
{
  return{
    type: DISABLE_BUTTONS,
    payload: state
  }
}

export function updateTotalUsers(){
  return (dispatch, getState) => {

    let paramPagination = getState().users.paramPagination;

    let param = '?pageSize='+paramPagination.perPage+'&pageNumber=1';

    axios.get(SETTING_API_URL+param)
    .then(function (response) {

      paramPagination.total = (response.data.pagination.total) ? Math.ceil((response.data.pagination.total / paramPagination.perPage)) : paramPagination.total;

      if(paramPagination.currentPage > paramPagination.total)
      {
        paramPagination.currentPage = paramPagination.total;
        dispatch(axiosLoadUsers((paramPagination)));
      }else{
        dispatch(setParamPagination(paramPagination));
      }


    })
  }
}

export function editUser(userData, {setSubmitting, resetForm}, user_id){
  setSubmitting(true);

  return dispatch => {
    dispatch(showLoader());
    axios.put(SETTING_API_URL+'/'+user_id, userData, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
      dispatch({type: AXIOS_USERS, payload: [response.data] });
      dispatch(hideLoader());
      dispatch(showAlert({text: 'User data updated successfully', addClass: 'alert-success'}));
      dispatch(updateTotalUsers());
    })

  }
}


export function addUser(userData, {setSubmitting, resetForm}){
  setSubmitting(true);
  return dispatch => {

    axios.post(SETTING_API_URL, userData, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(function (response) {
      dispatch(showAlert({text: 'User added successfully', addClass: 'alert-success'}));

      resetForm();
      setSubmitting(false);

      dispatch(updateTotalUsers());
    })

  }

}

export function deleteUser(user_id){
  return dispatch => {

    axios.delete(SETTING_API_URL+'/'+user_id)
    .then(function (response) {
      dispatch(updateTotalUsers());
      dispatch(setStateIsDelete(true));
    })

  }
}

export function setStateIsDelete(state){
  return{
    type: IS_DELETE,
    payload: state
  }

}

export function showLoader()
{
  return {
    type: SHOW_LOADER
  }
}

export function hideLoader()
{
  return {
    type: HIDE_LOADER
  }
}

export function disablePag()
{
  return {
    type: DISABLE_PAG
  }
}

export function enablePag()
{
  return {
    type: ENABLE_PAG
  }
}

export function showAlert(params)
{
  return dispatch => {
    dispatch({
      type: SHOW_ALERT,
      payload: params
    })
    setTimeout(() => {
      dispatch(hideAlert())
    }, 3000)
  }


}

export function hideAlert()
{
  return {
    type: HIDE_ALERT
  }
}

export function editStateButtons(state){
  return {
    type: EDIT_STATE_BUTTONS,
    payload: state
  }
}

export function axiosLoadUsers(pagParams = null, user_id = null){

  return dispatch => {

    dispatch(showLoader())

    let param = '';

    if(pagParams)
    {
      dispatch(disablePag())
      dispatch(editStateButtons(['view']))
      param = '?pageSize='+pagParams.perPage+'&pageNumber='+pagParams.currentPage;
    }else{
      dispatch(editStateButtons(['edit', 'delete']))
      param = '/'+user_id;
    }

    axios.get(SETTING_API_URL+param)
    .then(function (response) {

      if(pagParams)
      {
        pagParams.perPage = response.data.pagination.perPage;

        pagParams.total = (response.data.pagination.total) ? Math.ceil((response.data.pagination.total / pagParams.perPage)) : pagParams.total;

        pagParams.currentPage = response.data.pagination.currentPage;

        dispatch(setParamPagination(pagParams));
        dispatch(updateTotalUsers());
        dispatch(enablePag());
      }

      dispatch({type: AXIOS_USERS, payload: (response.data.data) ? response.data.data :  [response.data] });
      dispatch(hideLoader());

    })

  }

}

export function setParamPagination(params){
  return {
    type: SET_PARAM_PAGINATION,
    payload: params
  }
}
