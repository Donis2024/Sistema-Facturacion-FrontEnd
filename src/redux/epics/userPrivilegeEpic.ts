import { Epic, ofType, StateObservable } from "redux-observable";
import { mergeMap } from "rxjs/operators";
import { Observable } from "rxjs";
import {
  AppUserPrivilege,
  fetchUserPrivilegeFailure,
  fetchUserPrivilegeRequest,
  fetchUserPrivilegeSuccess,
  createUserPrivilegeSuccess,
  createUserPrivilegeRequest,
  createUserPrivilegeFailure,
  updateUserPrivilegeRequest,
  updateUserPrivilegeSuccess,
  updateUserPrivilegeFailure,
  deleteUserPrivilegeRequest,
  deleteUserPrivilegeSuccess,
  deleteUserPrivilegeFailure,
} from "../reducers/userPrivilegeReducer";
import axios, { AxiosResponse } from "axios";
import { ReduxState } from "../reducers/reducers";
import {
  ApiCreateResponse,
  ApiFetchResponse,
  ApiUpdateResponse,
} from "../reducers/interfaces";

const API_BASE_URL = "/appuserprivilege";

export const fetchUserPrivilegeEpic: Epic<any, any, any> = (
  action$: Observable<any>,
  store: StateObservable<ReduxState>
) =>
  action$.pipe(
    ofType(fetchUserPrivilegeRequest.type),
    mergeMap((action) =>
      axios
        .get(`${API_BASE_URL}`, {
          params: {
            pageSize: action.pageSize,
            page: action.page,
          },
        })
        .then((response: AxiosResponse<ApiFetchResponse<AppUserPrivilege>>) =>
          fetchUserPrivilegeSuccess(response.data)
        )
        .catch((error) => fetchUserPrivilegeFailure(error))
    )
  );

export const createUserPrivilegeEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(createUserPrivilegeRequest.type),
    mergeMap((action) =>
      axios
        .post(API_BASE_URL, action.payload)
        .then((response: AxiosResponse<ApiCreateResponse<AppUserPrivilege>>) =>
          createUserPrivilegeSuccess(response.data.content)
        )
        .catch((error) => createUserPrivilegeFailure(error.message))
    )
  );

export const updateUserPrivilegeEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(updateUserPrivilegeRequest.type),
    mergeMap((action) =>
      axios
        .put(`${API_BASE_URL}/${action.payload.uuid}`, action.payload)
        .then((response: AxiosResponse<ApiUpdateResponse<AppUserPrivilege>>) =>
          updateUserPrivilegeSuccess(response.data.content)
        )
        .catch((error) => updateUserPrivilegeFailure(error.message))
    )
  );

export const deleteUserPrivilegeEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(deleteUserPrivilegeRequest.type),
    mergeMap((action) =>
      axios
        .delete(`${API_BASE_URL}/${action.payload}`)
        .then(() => deleteUserPrivilegeSuccess(action.payload))
        .catch((error) => deleteUserPrivilegeFailure(error.message))
    )
  );
