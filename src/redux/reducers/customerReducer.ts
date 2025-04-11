import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiFetchResponse } from "./interfaces";

export interface AppCustomer {
  uuid: string;
  id: React.Key;
  updateDate: string;
  createDate: string;
  version: number;
  updateBy: string;
}

export interface CustomerState {
  loading: boolean;
  data: Array<AppCustomer>;
  error: string | null;
  pagination: {
    page: number;
    totalPages: number | null;
    pageSize: number;
    totalItems: number;
  };
}

export const customerSlice = createSlice({
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
    fetchCustomerRequest: (
      state: CustomerState,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.loading = true;
      state.pagination.pageSize = action.payload.pageSize;
    },
    fetchCustomerSuccess: (
      state: CustomerState,
      action: PayloadAction<ApiFetchResponse<AppCustomer>>
    ) => {
      state.loading = false;
      state.data = action.payload.content.items;
      state.pagination.page = action.payload.content.page;
      state.pagination.totalPages = action.payload.content.totalPages;
      state.pagination.totalItems = action.payload.content.totalElements;
    },
    fetchCustomerFailure: (state: CustomerState, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createCustomerRequest: (
      state: CustomerState,
      action: PayloadAction<Omit<AppCustomer, "id">>
    ) => {
      state.loading = true;
    },
    createCustomerSuccess: (
      state: CustomerState,
      action: PayloadAction<AppCustomer>
    ) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    createCustomerFailure: (
      state: CustomerState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCustomerRequest: (
      state: CustomerState,
      action: PayloadAction<AppCustomer>
    ) => {
      state.loading = true;
    },
    updateCustomerSuccess: (
      state: CustomerState,
      action: PayloadAction<AppCustomer>
    ) => {
      state.loading = false;
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    updateCustomerFailure: (
      state: CustomerState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCustomerRequest: (
      state: CustomerState,
      action: PayloadAction<string>
    ) => {
      state.loading = true;
    },
    deleteCustomerSuccess: (
      state: CustomerState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.uuid !== action.payload);
    },
    deleteCustomerFailure: (
      state: CustomerState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCustomerRequest,
  fetchCustomerSuccess,
  fetchCustomerFailure,
  createCustomerRequest,
  createCustomerSuccess,
  createCustomerFailure,
  updateCustomerRequest,
  updateCustomerSuccess,
  updateCustomerFailure,
  deleteCustomerRequest,
  deleteCustomerSuccess,
  deleteCustomerFailure,
} = customerSlice.actions;
