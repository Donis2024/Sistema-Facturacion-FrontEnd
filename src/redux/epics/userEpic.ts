import { Epic, ofType, StateObservable } from "redux-observable";
import { mergeMap } from "rxjs/operators";
import {
  AppUser,
  fetchUserFailure,
  fetchUserRequest,
  fetchUserSuccess,
  createUserSuccess,
  createUserRequest,
  createUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
} from "../reducers/userReducer";
import axios, { AxiosResponse } from "axios";
import { ReduxState } from "../reducers/reducers";
import {
  ApiCreateResponse,
  ApiFetchResponse,
  ApiUpdateResponse,
} from "../reducers/interfaces";
import { Observable } from "rxjs";

const API_BASE_URL = "/appuser";

export const fetchUserEpic: Epic<any, any, any> = (
  action$: Observable<any>,
  store: StateObservable<ReduxState>
) =>
  action$.pipe(
    ofType(fetchUserRequest.type),
    mergeMap((action) =>
      axios
        .get(`${API_BASE_URL}`, {
          params: {
            pageSize: action.pageSize,
            page: action.page,
          },
        })
        .then((response: AxiosResponse<ApiFetchResponse<AppUser>>) =>
          fetchUserSuccess(response.data)
        )
        .catch((error) => fetchUserFailure(error))
    )
  );

export const createUserEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(createUserRequest.type),
    mergeMap((action) =>
      axios
        .post(API_BASE_URL, action.payload)
        .then((response: AxiosResponse<ApiCreateResponse<AppUser>>) =>
          createUserSuccess(response.data.content)
        )
        .catch((error) => createUserFailure(error.message))
    )
  );

export const updateUserEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(updateUserRequest.type),
    mergeMap((action) =>
      axios
        .put(`${API_BASE_URL}/${action.payload.uuid}`, action.payload)
        .then((response: AxiosResponse<ApiUpdateResponse<AppUser>>) =>
          updateUserSuccess(response.data.content)
        )
        .catch((error) => updateUserFailure(error.message))
    )
  );

export const deleteUserEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(deleteUserRequest.type),
    mergeMap((action) =>
      axios
        .delete(`${API_BASE_URL}/${action.payload}`)
        .then(() => deleteUserSuccess(action.payload))
        .catch((error) => deleteUserFailure(error.message))
    )
  );
