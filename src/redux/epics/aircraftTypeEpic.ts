import { Epic, ofType, StateObservable } from "redux-observable";
import { mergeMap } from "rxjs/operators";
import { Observable } from "rxjs";
import {
  AppAircraftType,
  fetchAircraftTypeFailure,
  fetchAircraftTypeRequest,
  fetchAircraftTypeSuccess,
  createAircraftTypeSuccess,
  createAircraftTypeRequest,
  createAircraftTypeFailure,
  updateAircraftTypeRequest,
  updateAircraftTypeSuccess,
  updateAircraftTypeFailure,
  deleteAircraftTypeRequest,
  deleteAircraftTypeSuccess,
  deleteAircraftTypeFailure,
} from "../reducers/aircraftTypeReducer";
import axios, { AxiosResponse } from "axios";
import { ReduxState } from "../reducers/reducers";
import {
  ApiCreateResponse,
  ApiFetchResponse,
  ApiUpdateResponse,
} from "../reducers/interfaces";

const API_BASE_URL = "/appaircrafttype";

export const fetchAircraftTypeEpic: Epic<any, any, any> = (
  action$: Observable<any>,
  store: StateObservable<ReduxState>
) =>
  action$.pipe(
    ofType(fetchAircraftTypeRequest.type),
    mergeMap((action) =>
      axios
        .get(`${API_BASE_URL}`, {
          params: {
            pageSize: action.pageSize,
            page: action.page,
          },
        })
        .then((response: AxiosResponse<ApiFetchResponse<AppAircraftType>>) =>
          fetchAircraftTypeSuccess(response.data)
        )
        .catch((error) => fetchAircraftTypeFailure(error))
    )
  );

export const createAircraftTypeEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(createAircraftTypeRequest.type),
    mergeMap((action) =>
      axios
        .post(API_BASE_URL, action.payload)
        .then((response: AxiosResponse<ApiCreateResponse<AppAircraftType>>) =>
          createAircraftTypeSuccess(response.data.content)
        )
        .catch((error) => createAircraftTypeFailure(error.message))
    )
  );

export const updateAircraftTypeEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(updateAircraftTypeRequest.type),
    mergeMap((action) =>
      axios
        .put(`${API_BASE_URL}/${action.payload.uuid}`, action.payload)
        .then((response: AxiosResponse<ApiUpdateResponse<AppAircraftType>>) =>
          updateAircraftTypeSuccess(response.data.content)
        )
        .catch((error) => updateAircraftTypeFailure(error.message))
    )
  );

export const deleteAircraftTypeEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(deleteAircraftTypeRequest.type),
    mergeMap((action) =>
      axios
        .delete(`${API_BASE_URL}/${action.payload}`)
        .then(() => deleteAircraftTypeSuccess(action.payload))
        .catch((error) => deleteAircraftTypeFailure(error.message))
    )
  );
