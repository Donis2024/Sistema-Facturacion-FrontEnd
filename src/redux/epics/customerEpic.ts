import { Epic, ofType, StateObservable } from "redux-observable";
import { mergeMap } from "rxjs/operators";
import { Observable } from "rxjs";
import {
  AppCustomer,
  fetchCustomerFailure,
  fetchCustomerRequest,
  fetchCustomerSuccess,
  createCustomerSuccess,
  createCustomerRequest,
  createCustomerFailure,
  updateCustomerRequest,
  updateCustomerSuccess,
  updateCustomerFailure,
  deleteCustomerRequest,
  deleteCustomerSuccess,
  deleteCustomerFailure,
} from "../reducers/customerReducer";
import axios, { AxiosResponse } from "axios";
import { ReduxState } from "../reducers/reducers";
import {
  ApiCreateResponse,
  ApiFetchResponse,
  ApiUpdateResponse,
} from "../reducers/interfaces";

const API_BASE_URL = "/appcustomer";

export const fetchCustomerEpic: Epic<any, any, any> = (
  action$: Observable<any>,
  store: StateObservable<ReduxState>
) =>
  action$.pipe(
    ofType(fetchCustomerRequest.type),
    mergeMap((action) =>
      axios
        .get(`${API_BASE_URL}`, {
          params: {
            pageSize: action.pageSize,
            page: action.page,
          },
        })
        .then((response: AxiosResponse<ApiFetchResponse<AppCustomer>>) =>
          fetchCustomerSuccess(response.data)
        )
        .catch((error) => fetchCustomerFailure(error))
    )
  );

export const createCustomerEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(createCustomerRequest.type),
    mergeMap((action) =>
      axios
        .post(API_BASE_URL, action.payload)
        .then((response: AxiosResponse<ApiCreateResponse<AppCustomer>>) =>
          createCustomerSuccess(response.data.content)
        )
        .catch((error) => createCustomerFailure(error.message))
    )
  );

export const updateCustomerEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(updateCustomerRequest.type),
    mergeMap((action) =>
      axios
        .put(`${API_BASE_URL}/${action.payload.uuid}`, action.payload)
        .then((response: AxiosResponse<ApiUpdateResponse<AppCustomer>>) =>
          updateCustomerSuccess(response.data.content)
        )
        .catch((error) => updateCustomerFailure(error.message))
    )
  );

export const deleteCustomerEpic: Epic<any, any, any> = (action$) =>
  action$.pipe(
    ofType(deleteCustomerRequest.type),
    mergeMap((action) =>
      axios
        .delete(`${API_BASE_URL}/${action.payload}`)
        .then(() => deleteCustomerSuccess(action.payload))
        .catch((error) => deleteCustomerFailure(error.message))
    )
  );
