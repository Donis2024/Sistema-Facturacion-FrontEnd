import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiFetchResponse } from "./interfaces";

export interface AppAircraft {
  uuid: string;
  id: React.Key;
  updateDate: string;
  createDate: string;
  version: number;
  updateBy: string;
}

export interface AircraftState {
  loading: boolean;
  data: Array<AppAircraft>;
  error: string | null;
  pagination: {
    page: number;
    totalPages: number | null;
    pageSize: number;
    totalItems: number;
  };
}

export const aircraftSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    error: null,
    pagination: {
      page: 1,
      pageSize: 2,
      totalPages: null,
      totalItems: 0,
    },
  },
  reducers: {
    fetchAircraftRequest: (
      state: AircraftState,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.loading = true;
      state.pagination.pageSize = action.payload.pageSize;
    },
    fetchAircraftSuccess: (
      state: AircraftState,
      action: PayloadAction<ApiFetchResponse<AppAircraft>>
    ) => {
      state.loading = false;
      state.data = action.payload.content.items;
      state.pagination.page = action.payload.content.page;
      state.pagination.totalPages = action.payload.content.totalPages;
      state.pagination.totalItems = action.payload.content.totalElements;
    },
    fetchAircraftFailure: (state: AircraftState, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createAircraftRequest: (
      state: AircraftState,
      action: PayloadAction<Omit<AppAircraft, "id">>
    ) => {
      state.loading = true;
    },
    createAircraftSuccess: (
      state: AircraftState,
      action: PayloadAction<AppAircraft>
    ) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    createAircraftFailure: (
      state: AircraftState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateAircraftRequest: (
      state: AircraftState,
      action: PayloadAction<AppAircraft>
    ) => {
      state.loading = true;
    },
    updateAircraftSuccess: (
      state: AircraftState,
      action: PayloadAction<AppAircraft>
    ) => {
      state.loading = false;
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    updateAircraftFailure: (
      state: AircraftState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteAircraftRequest: (
      state: AircraftState,
      action: PayloadAction<string>
    ) => {
      state.loading = true;
    },
    deleteAircraftSuccess: (
      state: AircraftState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.uuid !== action.payload);
    },
    deleteAircraftFailure: (
      state: AircraftState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAircraftRequest,
  fetchAircraftSuccess,
  fetchAircraftFailure,
  createAircraftRequest,
  createAircraftSuccess,
  createAircraftFailure,
  updateAircraftRequest,
  updateAircraftSuccess,
  updateAircraftFailure,
  deleteAircraftRequest,
  deleteAircraftSuccess,
  deleteAircraftFailure,
} = aircraftSlice.actions;
