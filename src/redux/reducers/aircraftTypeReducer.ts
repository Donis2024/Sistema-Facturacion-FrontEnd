import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiFetchResponse } from "./interfaces";

export interface AppAircraftType {
  uuid: string;
  id: React.Key;
  aircraftType: string;
  description: string;
  updateDate: string;
  createDate: string;
  version: number;
  updateBy: string;
}

export interface AircraftTypeState {
  loading: boolean;
  data: Array<AppAircraftType>;
  error: string | null;
  pagination: {
    page: number;
    totalPages: number | null;
    pageSize: number;
    totalItems: number;
  };
}

export const aircraftTypeSlice = createSlice({
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
    fetchAircraftTypeRequest: (
      state: AircraftTypeState,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.loading = true;
      state.pagination.pageSize = action.payload.pageSize;
    },
    fetchAircraftTypeSuccess: (
      state: AircraftTypeState,
      action: PayloadAction<ApiFetchResponse<AppAircraftType>>
    ) => {
      state.loading = false;
      state.data = action.payload.content.items;
      state.pagination.page = action.payload.content.page;
      state.pagination.totalPages = action.payload.content.totalPages;
      state.pagination.totalItems = action.payload.content.totalElements;
    },
    fetchAircraftTypeFailure: (state: AircraftTypeState, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createAircraftTypeRequest: (
      state: AircraftTypeState,
      action: PayloadAction<Omit<AppAircraftType, "id">>
    ) => {
      state.loading = true;
    },
    createAircraftTypeSuccess: (
      state: AircraftTypeState,
      action: PayloadAction<AppAircraftType>
    ) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    createAircraftTypeFailure: (
      state: AircraftTypeState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateAircraftTypeRequest: (
      state: AircraftTypeState,
      action: PayloadAction<AppAircraftType>
    ) => {
      state.loading = true;
    },
    updateAircraftTypeSuccess: (
      state: AircraftTypeState,
      action: PayloadAction<AppAircraftType>
    ) => {
      state.loading = false;
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    updateAircraftTypeFailure: (
      state: AircraftTypeState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteAircraftTypeRequest: (
      state: AircraftTypeState,
      action: PayloadAction<string>
    ) => {
      state.loading = true;
    },
    deleteAircraftTypeSuccess: (
      state: AircraftTypeState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.uuid !== action.payload);
    },
    deleteAircraftTypeFailure: (
      state: AircraftTypeState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAircraftTypeRequest,
  fetchAircraftTypeSuccess,
  fetchAircraftTypeFailure,
  createAircraftTypeRequest,
  createAircraftTypeSuccess,
  createAircraftTypeFailure,
  updateAircraftTypeRequest,
  updateAircraftTypeSuccess,
  updateAircraftTypeFailure,
  deleteAircraftTypeRequest,
  deleteAircraftTypeSuccess,
  deleteAircraftTypeFailure,
} = aircraftTypeSlice.actions;
