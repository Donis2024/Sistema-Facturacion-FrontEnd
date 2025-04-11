import { Epic, ofType, StateObservable } from "redux-observable";
import { mergeMap } from "rxjs/operators";
import { Observable } from "rxjs";
import {
  AppModule,
  fetchModuleFailure,
  fetchModuleRequest,
  fetchModuleSuccess,
  createModuleSuccess,
  createModuleRequest,
  createModuleFailure,
  updateModuleRequest,
  updateModuleSuccess,
  updateModuleFailure,
  deleteModuleRequest,
  deleteModuleSuccess,
  deleteModuleFailure,
} from "../reducers/moduleReducer";
import axios, { AxiosResponse } from "axios";
import { ReduxState } from "../reducers/reducers";
import {
  ApiCreateResponse,
  ApiFetchResponse,
  ApiUpdateResponse,
} from "../reducers/interfaces";

const API_BASE_URL = "/appmodule";

export const fetchModuleEpic: Epic<any, any, any> = (
  action$: Observable<any>,
  store: StateObservable<ReduxState>
) =>
  action$.pipe(
    ofType(fetchModuleRequest.type),
    mergeMap((action) =>
      axios
        .get(`${API_BASE_URL}`, {
          params: {
            pageSize: action.pageSize,
            page: action.page,
          },
        })
        .then((response: AxiosResponse<ApiFetchResponse<AppModule>>) =>
          fetchModuleSuccess(response.data)
        )
        .catch((error) => fetchModuleFailure(error))
    )
  );

export const createModuleEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(createModuleRequest.type),
    mergeMap((action) =>
      axios
        .post(API_BASE_URL, action.payload)
        .then((response: AxiosResponse<ApiCreateResponse<AppModule>>) =>
          createModuleSuccess(response.data.content)
        )
        .catch((error) => createModuleFailure(error.message))
    )
  );

export const updateModuleEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(updateModuleRequest.type),
    mergeMap((action) =>
      axios
        .put(`${API_BASE_URL}/${action.payload.uuid}`, action.payload)
        .then((response: AxiosResponse<ApiUpdateResponse<AppModule>>) =>
          updateModuleSuccess(response.data.content)
        )
        .catch((error) => updateModuleFailure(error.message))
    )
  );

export const deleteModuleEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(deleteModuleRequest.type),
    mergeMap((action) =>
      axios
        .delete(`${API_BASE_URL}/${action.payload}`)
        .then(() => deleteModuleSuccess(action.payload))
        .catch((error) => deleteModuleFailure(error.message))
    )
  );
