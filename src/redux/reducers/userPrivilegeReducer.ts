import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiFetchResponse } from "./interfaces";

export interface AppUserPrivilege {
  uuid: string;
  id: React.Key;
  updateDate: string;
  createDate: string;
  version: number;
  updateBy: string;
  roleId: number;
  moduleId: number;
}

export interface UserPrivilegeState {
  loading: boolean;
  data: Array<AppUserPrivilege>;
  error: string | null;
  pagination: {
    page: number;
    totalPages: number | null;
    pageSize: number;
    totalItems: number;
  };
}

export const userPrivilegeSlice = createSlice({
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
    fetchUserPrivilegeRequest: (
      state: UserPrivilegeState,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.loading = true;
      state.pagination.pageSize = action.payload.pageSize;
    },
    fetchUserPrivilegeSuccess: (
      state: UserPrivilegeState,
      action: PayloadAction<ApiFetchResponse<AppUserPrivilege>>
    ) => {
      state.loading = false;
      state.data = action.payload.content.items;
      state.pagination.page = action.payload.content.page;
      state.pagination.totalPages = action.payload.content.totalPages;
      state.pagination.totalItems = action.payload.content.totalElements;
    },
    fetchUserPrivilegeFailure: (state: UserPrivilegeState, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createUserPrivilegeRequest: (
      state: UserPrivilegeState,
      action: PayloadAction<Omit<AppUserPrivilege, "id">>
    ) => {
      state.loading = true;
    },
    createUserPrivilegeSuccess: (
      state: UserPrivilegeState,
      action: PayloadAction<AppUserPrivilege>
    ) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    createUserPrivilegeFailure: (
      state: UserPrivilegeState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserPrivilegeRequest: (
      state: UserPrivilegeState,
      action: PayloadAction<AppUserPrivilege>
    ) => {
      state.loading = true;
    },
    updateUserPrivilegeSuccess: (
      state: UserPrivilegeState,
      action: PayloadAction<AppUserPrivilege>
    ) => {
      state.loading = false;
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    updateUserPrivilegeFailure: (
      state: UserPrivilegeState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserPrivilegeRequest: (
      state: UserPrivilegeState,
      action: PayloadAction<string>
    ) => {
      state.loading = true;
    },
    deleteUserPrivilegeSuccess: (
      state: UserPrivilegeState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.uuid !== action.payload);
    },
    deleteUserPrivilegeFailure: (
      state: UserPrivilegeState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUserPrivilegeRequest,
  fetchUserPrivilegeSuccess,
  fetchUserPrivilegeFailure,
  createUserPrivilegeRequest,
  createUserPrivilegeSuccess,
  createUserPrivilegeFailure,
  updateUserPrivilegeRequest,
  updateUserPrivilegeSuccess,
  updateUserPrivilegeFailure,
  deleteUserPrivilegeRequest,
  deleteUserPrivilegeSuccess,
  deleteUserPrivilegeFailure,
} = userPrivilegeSlice.actions;
