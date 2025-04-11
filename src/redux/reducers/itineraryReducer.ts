import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiFetchResponse } from "./interfaces";

export interface AppItinerary {
  uuid: string;
  id: React.Key;
  updateDate: string;
  createDate: string;
  version: number;
  updateBy: string;
}

export interface ItineraryState {
  loading: boolean;
  data: Array<AppItinerary>;
  error: string | null;
  pagination: {
    page: number;
    totalPages: number | null;
    pageSize: number;
    totalItems: number;
  };
}

export const itinerarySlice = createSlice({
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
    fetchItineraryRequest: (
      state: ItineraryState,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.loading = true;
      state.pagination.pageSize = action.payload.pageSize;
    },
    fetchItinerarySuccess: (
      state: ItineraryState,
      action: PayloadAction<ApiFetchResponse<AppItinerary>>
    ) => {
      state.loading = false;
      state.data = action.payload.content.items;
      state.pagination.page = action.payload.content.page;
      state.pagination.totalPages = action.payload.content.totalPages;
      state.pagination.totalItems = action.payload.content.totalElements;
    },
    fetchItineraryFailure: (state: ItineraryState, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createItineraryRequest: (
      state: ItineraryState,
      action: PayloadAction<Omit<AppItinerary, "id">>
    ) => {
      state.loading = true;
    },
    createItinerarySuccess: (
      state: ItineraryState,
      action: PayloadAction<AppItinerary>
    ) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    createItineraryFailure: (
      state: ItineraryState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateItineraryRequest: (
      state: ItineraryState,
      action: PayloadAction<AppItinerary>
    ) => {
      state.loading = true;
    },
    updateItinerarySuccess: (
      state: ItineraryState,
      action: PayloadAction<AppItinerary>
    ) => {
      state.loading = false;
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    updateItineraryFailure: (
      state: ItineraryState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteItineraryRequest: (
      state: ItineraryState,
      action: PayloadAction<string>
    ) => {
      state.loading = true;
    },
    deleteItinerarySuccess: (
      state: ItineraryState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.data = state.data.filter((item) => item.uuid !== action.payload);
    },
    deleteItineraryFailure: (
      state: ItineraryState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchItineraryRequest,
  fetchItinerarySuccess,
  fetchItineraryFailure,
  createItineraryRequest,
  createItinerarySuccess,
  createItineraryFailure,
  updateItineraryRequest,
  updateItinerarySuccess,
  updateItineraryFailure,
  deleteItineraryRequest,
  deleteItinerarySuccess,
  deleteItineraryFailure,
} = itinerarySlice.actions;
