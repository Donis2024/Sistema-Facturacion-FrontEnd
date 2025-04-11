import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiFetchResponse } from "./interfaces";

export interface AppService {
  uuid: string;
  id: React.Key;
  updateDate: string;
  createDate: string;
  version: number;
  updateBy: string;
}

export interface ServiceState {
  loading: boolean;
  data: Array<AppService>;
  error: string | null;
  pagination: {
    page: number;
    totalPages: number | null;
    pageSize: number;
    totalItems: number;
  };
}

export const serviceSlice = createSlice({
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
    fetchServiceRequest: (
      state: ServiceState,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.loading = true;
      state.pagination.pageSize = action.payload.pageSize;
    },
    fetchServiceSuccess: (
      state: ServiceState,
      action: PayloadAction<ApiFetchResponse<AppService>>
    ) => {
      state.loading = false;
      state.data = action.payload.content.items;
      state.pagination.page = action.payload.content.page;
      state.pagination.totalPages = action.payload.content.totalPages;
      state.pagination.totalItems = action.payload.content.totalElements;
    },
    fetchServiceFailure: (state: ServiceState, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createServiceRequest: (
      state: ServiceState,
      action: PayloadAction<Omit<AppService, "id">>
    ) => {
      state.loading = true;
    },
    createServiceSuccess: (
      state: ServiceState,
      action: PayloadAction<AppService>
    ) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    createServiceFailure: (
      state: ServiceState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateServiceRequest: (
      state: ServiceState,
      action: PayloadAction<AppService>
    ) => {
      state.loading = true;
    },
    updateServiceSuccess: (
      state: ServiceState,
      action: PayloadAction<AppService>
    ) => {
      state.loading = false;
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    updateServiceFailure: (
      state: ServiceState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteServiceRequest: (
      state: ServiceState,
      action: PayloadAction<string>
    ) => {
      state.loading = true;
    },
    deleteServiceSuccess: (
      state: ServiceState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.uuid !== action.payload);
    },
    deleteServiceFailure: (
      state: ServiceState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchServiceRequest,
  fetchServiceSuccess,
  fetchServiceFailure,
  createServiceRequest,
  createServiceSuccess,
  createServiceFailure,
  updateServiceRequest,
  updateServiceSuccess,
  updateServiceFailure,
  deleteServiceRequest,
  deleteServiceSuccess,
  deleteServiceFailure,
} = serviceSlice.actions;
