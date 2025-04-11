import { Epic, ofType, StateObservable } from "redux-observable";
import {  mergeMap } from "rxjs/operators";
import {  Observable } from "rxjs";
import {
  AppService,
  fetchServiceFailure,
  fetchServiceRequest,
  fetchServiceSuccess,
  createServiceSuccess,
  createServiceRequest,
  createServiceFailure,
  updateServiceRequest,
  updateServiceSuccess,
  updateServiceFailure,
  deleteServiceRequest,
  deleteServiceSuccess,
  deleteServiceFailure,
} from "../reducers/serviceReducer";
import axios, { AxiosResponse } from "axios";
import { ReduxState } from "../reducers/reducers";
import { ApiCreateResponse, ApiFetchResponse, ApiUpdateResponse } from "../reducers/interfaces";

const API_BASE_URL = "/appservice";

export const fetchServiceEpic: Epic<any, any, any> = (
  action$: Observable<any>,
  store: StateObservable<ReduxState>
) =>
  action$.pipe(
    ofType(fetchServiceRequest.type),
    mergeMap((action) =>
      axios
        .get(`${API_BASE_URL}`, {
          params: {
            pageSize: action.pageSize,
            page: action.page,
          },
        })
        .then((response: AxiosResponse<ApiFetchResponse<AppService>>) =>
          fetchServiceSuccess(response.data)
        )
        .catch((error) => fetchServiceFailure(error))
    )
  );

export const createServiceEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(createServiceRequest.type),
    mergeMap((action) =>
      axios
        .post(API_BASE_URL, action.payload)
        .then((response: AxiosResponse<ApiCreateResponse<AppService>>) =>
          createServiceSuccess(response.data.content)
        )
        .catch((error) => createServiceFailure(error.message))
    )
  );

export const updateServiceEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(updateServiceRequest.type),
    mergeMap((action) =>
      axios
        .put(`${API_BASE_URL}/${action.payload.uuid}`, action.payload)
        .then((response: AxiosResponse<ApiUpdateResponse<AppService>>) =>
          updateServiceSuccess(response.data.content)
        )
        .catch((error) => updateServiceFailure(error.message))
    )
  );

export const deleteServiceEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(deleteServiceRequest.type),
    mergeMap((action) =>
      axios
        .delete(`${API_BASE_URL}/${action.payload}`)
        .then(() => deleteServiceSuccess(action.payload))
        .catch((error) => deleteServiceFailure(error.message))
    )
  );
