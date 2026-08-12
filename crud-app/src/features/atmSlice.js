import { createSlice } from "@reduxjs/toolkit";

import {
  loginAsync,
  depositAsync,
  withdrawAsync,
  transferAsync,
  fetchCustomerAsync,
  fetchTransactionsAsync,
} from "./atmThunks";

const initialState = {
  user: null,
  customer: null,
  transactions: [],
  loading: false,
  error: null,
};

const atmSlice = createSlice({
  name: "atm",
  initialState,

  reducers: {
    logout(state) {
      state.user = null;
      state.customer = null;
      state.transactions = [];
      state.loading = false;
      state.error = null;
    },

    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.name;
        state.customer = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // CUSTOMER DETAILS
      .addCase(fetchCustomerAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(fetchCustomerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // DEPOSIT
      .addCase(depositAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(depositAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(depositAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // WITHDRAW
      .addCase(withdrawAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(withdrawAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(withdrawAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // TRANSFER
      .addCase(transferAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(transferAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(transferAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // TRANSACTIONS
      .addCase(fetchTransactionsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchTransactionsAsync.fulfilled,
        (state, action) => {
          state.loading = false;
          state.transactions = action.payload;
        }
      )
      .addCase(
        fetchTransactionsAsync.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export const { logout, clearError } =
  atmSlice.actions;

export default atmSlice.reducer;