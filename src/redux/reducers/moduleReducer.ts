import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiFetchResponse } from "./interfaces";

export interface AppModule {
  uuid: string;
  id: React.Key;
  module: string;
  updateDate: string;
  createDate: string;
  version: number;
  updateBy: string;
}

export interface ModuleState {
  loading: boolean;
  data: Array<AppModule>;
  error: string | null;
  pagination: {
    page: number;
    totalPages: number | null;
    pageSize: number;
    totalItems: number;
  };
}

export const moduleSlice = createSlice({
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
    fetchModuleRequest: (
      state: ModuleState,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.loading = true;
      state.pagination.pageSize = action.payload.pageSize;
    },
    fetchModuleSuccess: (
      state: ModuleState,
      action: PayloadAction<ApiFetchResponse<AppModule>>
    ) => {
      state.loading = false;
      state.data = action.payload.content.items;
      state.pagination.page = action.payload.content.page;
      state.pagination.totalPages = action.payload.content.totalPages;
      state.pagination.totalItems = action.payload.content.totalElements;
    },
    fetchModuleFailure: (state: ModuleState, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createModuleRequest: (
      state: ModuleState,
      action: PayloadAction<Omit<AppModule, "id">>
    ) => {
      state.loading = true;
    },
    createModuleSuccess: (
      state: ModuleState,
      action: PayloadAction<AppModule>
    ) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    createModuleFailure: (
      state: ModuleState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateModuleRequest: (
      state: ModuleState,
      action: PayloadAction<AppModule>
    ) => {
      state.loading = true;
    },
    updateModuleSuccess: (
      state: ModuleState,
      action: PayloadAction<AppModule>
    ) => {
      state.loading = false;
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    updateModuleFailure: (
      state: ModuleState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteModuleRequest: (
      state: ModuleState,
      action: PayloadAction<string>
    ) => {
      state.loading = true;
    },
    deleteModuleSuccess: (
      state: ModuleState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.uuid !== action.payload);
    },
    deleteModuleFailure: (
      state: ModuleState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchModuleRequest,
  fetchModuleSuccess,
  fetchModuleFailure,
  createModuleRequest,
  createModuleSuccess,
  createModuleFailure,
  updateModuleRequest,
  updateModuleSuccess,
  updateModuleFailure,
  deleteModuleRequest,
  deleteModuleSuccess,
  deleteModuleFailure,
} = moduleSlice.actions;
