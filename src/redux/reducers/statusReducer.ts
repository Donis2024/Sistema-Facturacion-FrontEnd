import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiFetchResponse } from "./interfaces";
export interface AppStatus {
  uuid: string;
  id: React.Key;
  status: string;
  updateDate: string;
  createDate: string;
  version: number;
  updateBy: string;
}

export interface StatusState {
  loading: boolean;
  data: Array<AppStatus>;
  error: string | null;
  pagination: {
    page: number;
    totalPages: number | null;
    pageSize: number;
    totalItems: number;
  };
}

export const statusSlice = createSlice({
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
    fetchStatusRequest: (
      state: StatusState,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.loading = true;
      state.pagination.pageSize = action.payload.pageSize;
    },
    fetchStatusSuccess: (
      state: StatusState,
      action: PayloadAction<ApiFetchResponse<AppStatus>>
    ) => {
      state.loading = false;
      state.data = action.payload.content.items;
      state.pagination.page = action.payload.content.page;
      state.pagination.totalPages = action.payload.content.totalPages;
      state.pagination.totalItems = action.payload.content.totalElements;
    },
    fetchStatusFailure: (state: StatusState, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createStatusRequest: (
      state: StatusState,
      action: PayloadAction<Omit<AppStatus, "id">>
    ) => {
      state.loading = true;
    },
    createStatusSuccess: (
      state: StatusState,
      action: PayloadAction<AppStatus>
    ) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    createStatusFailure: (
      state: StatusState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStatusRequest: (
      state: StatusState,
      action: PayloadAction<AppStatus>
    ) => {
      state.loading = true;
    },
    updateStatusSuccess: (
      state: StatusState,
      action: PayloadAction<AppStatus>
    ) => {
      state.loading = false;
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    updateStatusFailure: (
      state: StatusState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteStatusRequest: (
      state: StatusState,
      action: PayloadAction<string>
    ) => {
      state.loading = true;
    },
    deleteStatusSuccess: (
      state: StatusState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.uuid !== action.payload);
    },
    deleteStatusFailure: (
      state: StatusState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchStatusRequest,
  fetchStatusSuccess,
  fetchStatusFailure,
  createStatusRequest,
  createStatusSuccess,
  createStatusFailure,
  updateStatusRequest,
  updateStatusSuccess,
  updateStatusFailure,
  deleteStatusRequest,
  deleteStatusSuccess,
  deleteStatusFailure,
} = statusSlice.actions;
