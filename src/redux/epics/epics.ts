import { combineEpics, StateObservable } from "redux-observable";
import {
  createAircraftTypeEpic,
  deleteAircraftTypeEpic,
  fetchAircraftTypeEpic,
  updateAircraftTypeEpic,
} from "./aircraftTypeEpic";
import {
  fetchCustomerEpic,
  createCustomerEpic,
  updateCustomerEpic,
  deleteCustomerEpic,
} from "./customerEpic";
import {
  fetchAircraftEpic,
  createAircraftEpic,
  updateAircraftEpic,
  deleteAircraftEpic,
} from "./aircraftEpic";
import {
  fetchItineraryEpic,
  createItineraryEpic,
  updateItineraryEpic,
  deleteItineraryEpic,
} from "./itineraryEpic";

import {
  fetchServiceEpic,
  createServiceEpic,
  updateServiceEpic,
  deleteServiceEpic,
} from "./serviceEpic";
import { loginEpic } from "./loginEpic";
import { Observable, catchError } from "rxjs";
import {
  fetchUserEpic,
  createUserEpic,
  updateUserEpic,
  deleteUserEpic,
} from "./userEpic";
import {
  fetchUserPrivilegeEpic,
  createUserPrivilegeEpic,
  updateUserPrivilegeEpic,
  deleteUserPrivilegeEpic,
} from "./userPrivilegeEpic";
import {
  fetchUserRoleEpic,
  createUserRoleEpic,
  updateUserRoleEpic,
  deleteUserRoleEpic,
} from "./userRoleEpic";
import {
  fetchModuleEpic,
  createModuleEpic,
  updateModuleEpic,
  deleteModuleEpic,
} from "./moduleEpic";
import {
  fetchStatusEpic,
  createStatusEpic,
  updateStatusEpic,
  deleteStatusEpic,
} from "./statusEpic";

export const rootEpic = (
  action$: Observable<any>,
  store$: StateObservable<any>,
  dependencies: any
) =>
  combineEpics(
    loginEpic,
    fetchAircraftTypeEpic,
    createAircraftTypeEpic,
    updateAircraftTypeEpic,
    deleteAircraftTypeEpic,
    fetchCustomerEpic,
    createCustomerEpic,
    updateCustomerEpic,
    deleteCustomerEpic,
    fetchAircraftEpic,
    createAircraftEpic,
    updateAircraftEpic,
    deleteAircraftEpic,
    fetchItineraryEpic,
    createItineraryEpic,
    updateItineraryEpic,
    deleteItineraryEpic,
    fetchServiceEpic,
    createServiceEpic,
    updateServiceEpic,
    deleteServiceEpic,
    fetchUserEpic,
    createUserEpic,
    updateUserEpic,
    deleteUserEpic,
    fetchUserRoleEpic,
    createUserRoleEpic,
    updateUserRoleEpic,
    deleteUserRoleEpic,
    fetchUserPrivilegeEpic,
    createUserPrivilegeEpic,
    updateUserPrivilegeEpic,
    deleteUserPrivilegeEpic,
    fetchModuleEpic,
    createModuleEpic,
    updateModuleEpic,
    deleteModuleEpic,
    fetchStatusEpic,
    createStatusEpic,
    updateStatusEpic,
    deleteStatusEpic
  )(action$, store$, dependencies).pipe(
    catchError((error: any, source: any) => {
      return source;
    })
  );
