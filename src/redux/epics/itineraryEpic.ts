import { Epic, ofType, StateObservable } from "redux-observable";
import { mergeMap } from "rxjs/operators";
import {  Observable } from "rxjs";
import {
  AppItinerary,
  fetchItineraryFailure,
  fetchItineraryRequest,
  fetchItinerarySuccess,
  createItinerarySuccess,
  createItineraryRequest,
  createItineraryFailure,
  updateItineraryRequest,
  updateItinerarySuccess,
  updateItineraryFailure,
  deleteItineraryRequest,
  deleteItinerarySuccess,
  deleteItineraryFailure,
} from "../reducers/itineraryReducer";
import axios, { AxiosResponse } from "axios";
import { ReduxState } from "../reducers/reducers";
import {
  ApiCreateResponse,
  ApiFetchResponse,
  ApiUpdateResponse,
} from "../reducers/interfaces";

const API_BASE_URL = "/appitinerary";

export const fetchItineraryEpic: Epic<any, any, any> = (
  action$: Observable<any>,
  store: StateObservable<ReduxState>
) =>
  action$.pipe(
    ofType(fetchItineraryRequest.type),
    mergeMap((action) =>
      axios
        .get(`${API_BASE_URL}`, {
          params: {
            pageSize: action.pageSize,
            page: action.page,
          },
        })
        .then((response: AxiosResponse<ApiFetchResponse<AppItinerary>>) =>
          fetchItinerarySuccess(response.data)
        )
        .catch((error) => fetchItineraryFailure(error))
    )
  );

export const createItineraryEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(createItineraryRequest.type),
    mergeMap((action) =>
      axios
        .post(API_BASE_URL, action.payload)
        .then((response: AxiosResponse<ApiCreateResponse<AppItinerary>>) =>
          createItinerarySuccess(response.data.content)
        )
        .catch((error) => createItineraryFailure(error.message))
    )
  );

export const updateItineraryEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(updateItineraryRequest.type),
    mergeMap((action) =>
      axios
        .put(`${API_BASE_URL}/${action.payload.uuid}`, action.payload)
        .then((response: AxiosResponse<ApiUpdateResponse<AppItinerary>>) =>
          updateItinerarySuccess(response.data.content)
        )
        .catch((error) => updateItineraryFailure(error.message))
    )
  );

export const deleteItineraryEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(deleteItineraryRequest.type),
    mergeMap((action) =>
      axios
        .delete(`${API_BASE_URL}/${action.payload}`)
        .then(() => deleteItinerarySuccess(action.payload))
        .catch((error) => deleteItineraryFailure(error.message))
    )
  );
