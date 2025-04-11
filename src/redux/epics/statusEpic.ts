import { Epic, ofType, StateObservable } from "redux-observable";
import { mergeMap } from "rxjs/operators";
import {  Observable } from "rxjs";
import {
  AppStatus,
  fetchStatusFailure,
  fetchStatusRequest,
  fetchStatusSuccess,
  createStatusSuccess,
  createStatusRequest,
  createStatusFailure,
  updateStatusRequest,
  updateStatusSuccess,
  updateStatusFailure,
  deleteStatusRequest,
  deleteStatusSuccess,
  deleteStatusFailure,
} from "../reducers/statusReducer";
import axios, { AxiosResponse } from "axios";
import { ReduxState } from "../reducers/reducers";
import {
  ApiCreateResponse,
  ApiFetchResponse,
  ApiUpdateResponse,
} from "../reducers/interfaces";

const API_BASE_URL = "/appstatus";

export const fetchStatusEpic: Epic<any, any, any> = (
  action$: Observable<any>,
  store: StateObservable<ReduxState>
) =>
  action$.pipe(
    ofType(fetchStatusRequest.type),
    mergeMap((action) =>
      axios
        .get(`${API_BASE_URL}`, {
          params: {
            pageSize: action.pageSize,
            page: action.page,
          },
        })
        .then((response: AxiosResponse<ApiFetchResponse<AppStatus>>) =>
          fetchStatusSuccess(response.data)
        )
        .catch((error) => fetchStatusFailure(error))
    )
  );

export const createStatusEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(createStatusRequest.type),
    mergeMap((action) =>
      axios
        .post(API_BASE_URL, action.payload)
        .then((response: AxiosResponse<ApiCreateResponse<AppStatus>>) =>
          createStatusSuccess(response.data.content)
        )
        .catch((error) => createStatusFailure(error.message))
    )
  );

export const updateStatusEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(updateStatusRequest.type),
    mergeMap((action) =>
      axios
        .put(`${API_BASE_URL}/${action.payload.uuid}`, action.payload)
        .then((response: AxiosResponse<ApiUpdateResponse<AppStatus>>) =>
          updateStatusSuccess(response.data.content)
        )
        .catch((error) => updateStatusFailure(error.message))
    )
  );

export const deleteStatusEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(deleteStatusRequest.type),
    mergeMap((action) =>
      axios
        .delete(`${API_BASE_URL}/${action.payload}`)
        .then(() => deleteStatusSuccess(action.payload))
        .catch((error) => deleteStatusFailure(error.message))
    )
  );
