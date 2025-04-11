import { Epic, ofType, StateObservable } from "redux-observable";
import { mergeMap } from "rxjs/operators";
import { Observable } from "rxjs";
import {
  AppUserRole,
  fetchUserRoleFailure,
  fetchUserRoleRequest,
  fetchUserRoleSuccess,
  createUserRoleSuccess,
  createUserRoleRequest,
  createUserRoleFailure,
  updateUserRoleRequest,
  updateUserRoleSuccess,
  updateUserRoleFailure,
  deleteUserRoleRequest,
  deleteUserRoleSuccess,
  deleteUserRoleFailure,
} from "../reducers/userRoleReducer";
import axios, { AxiosResponse } from "axios";
import { ReduxState } from "../reducers/reducers";
import {
  ApiCreateResponse,
  ApiFetchResponse,
  ApiUpdateResponse,
} from "../reducers/interfaces";

const API_BASE_URL = "/appuserrole";

export const fetchUserRoleEpic: Epic<any, any, any> = (
  action$: Observable<any>,
  store: StateObservable<ReduxState>
) =>
  action$.pipe(
    ofType(fetchUserRoleRequest.type),
    mergeMap((action) =>
      axios
        .get(`${API_BASE_URL}`, {
          params: {
            pageSize: action.pageSize,
            page: action.page,
          },
        })
        .then((response: AxiosResponse<ApiFetchResponse<AppUserRole>>) =>
          fetchUserRoleSuccess(response.data)
        )
        .catch((error) => fetchUserRoleFailure(error))
    )
  );

export const createUserRoleEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(createUserRoleRequest.type),
    mergeMap((action) =>
      axios
        .post(API_BASE_URL, action.payload)
        .then((response: AxiosResponse<ApiCreateResponse<AppUserRole>>) =>
          createUserRoleSuccess(response.data.content)
        )
        .catch((error) => createUserRoleFailure(error.message))
    )
  );

export const updateUserRoleEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(updateUserRoleRequest.type),
    mergeMap((action) =>
      axios
        .put(`${API_BASE_URL}/${action.payload.uuid}`, action.payload)
        .then((response: AxiosResponse<ApiUpdateResponse<AppUserRole>>) =>
          updateUserRoleSuccess(response.data.content)
        )
        .catch((error) => updateUserRoleFailure(error.message))
    )
  );

export const deleteUserRoleEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(deleteUserRoleRequest.type),
    mergeMap((action) =>
      axios
        .delete(`${API_BASE_URL}/${action.payload}`)
        .then(() => deleteUserRoleSuccess(action.payload))
        .catch((error) => deleteUserRoleFailure(error.message))
    )
  );
