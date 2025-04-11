import { Epic, ofType, StateObservable } from "redux-observable";
import { mergeMap } from "rxjs/operators";
import { Observable } from "rxjs";
import {
  AppAircraft,
  fetchAircraftFailure,
  fetchAircraftRequest,
  fetchAircraftSuccess,
  createAircraftSuccess,
  createAircraftRequest,
  createAircraftFailure,
  updateAircraftRequest,
  updateAircraftSuccess,
  updateAircraftFailure,
  deleteAircraftRequest,
  deleteAircraftSuccess,
  deleteAircraftFailure,
} from "../reducers/aircraftReducer";
import axios, { AxiosResponse } from "axios";
import { ReduxState } from "../reducers/reducers";
import {
  ApiCreateResponse,
  ApiFetchResponse,
  ApiUpdateResponse,
} from "../reducers/interfaces";

const API_BASE_URL = "/appaircraft";

export const fetchAircraftEpic: Epic<any, any, any> = (
  action$: Observable<any>,
  store: StateObservable<ReduxState>
) =>
  action$.pipe(
    ofType(fetchAircraftRequest.type),
    mergeMap((action) =>
      axios
        .get(`${API_BASE_URL}`, {
          params: {
            pageSize: action.pageSize,
            page: action.page,
          },
        })
        .then((response: AxiosResponse<ApiFetchResponse<AppAircraft>>) =>
          fetchAircraftSuccess(response.data)
        )
        .catch((error) => fetchAircraftFailure(error))
    )
  );

export const createAircraftEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(createAircraftRequest.type),
    mergeMap((action) =>
      axios
        .post(API_BASE_URL, action.payload)
        .then((response: AxiosResponse<ApiCreateResponse<AppAircraft>>) =>
          createAircraftSuccess(response.data.content)
        )
        .catch((error) => createAircraftFailure(error.message))
    )
  );

export const updateAircraftEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(updateAircraftRequest.type),
    mergeMap((action) =>
      axios
        .put(`${API_BASE_URL}/${action.payload.uuid}`, action.payload)
        .then((response: AxiosResponse<ApiUpdateResponse<AppAircraft>>) =>
          updateAircraftSuccess(response.data.content)
        )
        .catch((error) => updateAircraftFailure(error.message))
    )
  );

export const deleteAircraftEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(deleteAircraftRequest.type),
    mergeMap((action) =>
      axios
        .delete(`${API_BASE_URL}/${action.payload}`)
        .then(() => deleteAircraftSuccess(action.payload))
        .catch((error) => deleteAircraftFailure(error.message))
    )
  );
