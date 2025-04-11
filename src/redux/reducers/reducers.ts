import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { aircraftTypeSlice, AircraftTypeState } from "./aircraftTypeReducer";
import { loginSlice, LoginState } from "./loginReducer";
import { customerSlice, CustomerState } from "./customerReducer";
import { aircraftSlice, AircraftState } from "./aircraftReducer";
import { itinerarySlice, ItineraryState } from "./itineraryReducer";
import { serviceSlice, ServiceState } from "./serviceReducer";
import { userSlice, UserState } from "./userReducer";
import { userRoleSlice, UserRoleState } from "./userRoleReducer";
import { userPrivilegeSlice, UserPrivilegeState } from "./userPrivilegeReducer";
import { moduleSlice, ModuleState } from "./moduleReducer";
import { statusSlice, StatusState } from "./statusReducer";

export const rootReducer: Reducer = combineReducers(
  Object.freeze({
    login: loginSlice.reducer,
    aircraftType: aircraftTypeSlice.reducer,
    customer: customerSlice.reducer,
    aircraft: aircraftSlice.reducer,
    itinerary: itinerarySlice.reducer,
    service: serviceSlice.reducer,
    user: userSlice.reducer,
    userRole: userRoleSlice.reducer,
    userPrivilege: userPrivilegeSlice.reducer,
    module: moduleSlice.reducer,
    userStatus: statusSlice.reducer,
  })
);

export interface ReduxState {
  login: LoginState;
  aircraftType: AircraftTypeState;
  customer: CustomerState;
  aircraft: AircraftState;
  itinerary: ItineraryState;
  service: ServiceState;
  user: UserState;
  userRole: UserRoleState;
  userPrivilege: UserPrivilegeState;
  module: ModuleState;
  userStatus: StatusState;
}
