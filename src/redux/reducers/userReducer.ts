import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiFetchResponse } from "./interfaces";

export interface AppUser {
  uuid: string;
  id: React.Key;
  user: string;
  name: string;
  roleId: number;
  statusId: number;
  updateDate: string;
  createDate: string;
  version: number;
  updateBy: string;
}

export interface UserState {
  loading: boolean;
  data: Array<AppUser>;
  error: string | null;
  pagination: {
    page: number;
    totalPages: number | null;
    pageSize: number;
    totalItems: number;
  };
}

export const userSlice = createSlice({
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
    fetchUserRequest: (
      state: UserState,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.loading = true;
      state.pagination.pageSize = action.payload.pageSize;
    },
    fetchUserSuccess: (
      state: UserState,
      action: PayloadAction<ApiFetchResponse<AppUser>>
    ) => {
      state.loading = false;
      state.data = action.payload.content.items;
      state.pagination.page = action.payload.content.page;
      state.pagination.totalPages = action.payload.content.totalPages;
      state.pagination.totalItems = action.payload.content.totalElements;
    },
    fetchUserFailure: (state: UserState, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createUserRequest: (
      state: UserState,
      action: PayloadAction<Omit<AppUser, "id">>
    ) => {
      state.loading = true;
    },
    createUserSuccess: (state: UserState, action: PayloadAction<AppUser>) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    createUserFailure: (state: UserState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserRequest: (state: UserState, action: PayloadAction<AppUser>) => {
      state.loading = true;
    },
    updateUserSuccess: (state: UserState, action: PayloadAction<AppUser>) => {
      state.loading = false;
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    updateUserFailure: (state: UserState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserRequest: (state: UserState, action: PayloadAction<string>) => {
      state.loading = true;
    },
    deleteUserSuccess: (state: UserState, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.uuid !== action.payload);
    },
    deleteUserFailure: (state: UserState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;
