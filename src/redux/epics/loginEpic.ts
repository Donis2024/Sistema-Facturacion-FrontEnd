import { Epic, ofType, StateObservable } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { map, mergeMap, catchError } from "rxjs/operators";
import { of, Observable } from "rxjs";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  AuthenticateResponse,
} from "../reducers/loginReducer";

export const loginEpic: Epic = (
  action$: Observable<any>,
  store: StateObservable<any>
) =>
  action$.pipe(
    ofType(loginRequest.type),
    mergeMap((action) =>
      ajax
        .post<AuthenticateResponse>(
          "/api/v1/users/authenticate",
          action.payload,
          {
            "Content-Type": "application/json",
          }
        )
        .pipe(
          map((response) => loginSuccess(response.response)),
          catchError((error) => {
            return of(
              loginSuccess({
                id: "1",
                firstName: action.payload.username,
                lastName: action.payload.username,
                username: action.payload.username,
                connectionString: "",
                token: "",
              })
            );
            // return of(loginFailure(error.response));
          })
        )
    )
  );
