import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  loginCustomer,
  depositAmount,
  withdrawAmount,
  transferAmount,
  getCustomerDetails,
  getTransactions,
} from "../app/atmApiLayer";

// LOGIN
export const loginAsync =
  createAsyncThunk(
    "atm/login",
    async (name, { rejectWithValue }) => {
      try {

        const response =
          await loginCustomer(name);

        return response.data;

      } catch (error) {

        if (!error.response) {

          return rejectWithValue(
            "Backend server is not running. Please start Spring Boot application."
          );
        }

        return rejectWithValue(
          error.response?.data?.message ||
          "Login failed"
        );
      }
    }
  );

// DEPOSIT
export const depositAsync = createAsyncThunk(
  "atm/deposit",
  async (
    { name, amount },
    { rejectWithValue }
  ) => {
    try {

      const response =
        await depositAmount(
          name,
          amount
        );

      return response.data;

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Deposit failed"
      );
    }
  }
);

// WITHDRAW
export const withdrawAsync = createAsyncThunk(
  "atm/withdraw",
  async (
    { name, amount },
    { rejectWithValue }
  ) => {
    try {

      const response =
        await withdrawAmount(
          name,
          amount
        );

      return response.data;

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Withdrawal failed"
      );
    }
  }
);

// TRANSFER
export const transferAsync = createAsyncThunk(
  "atm/transfer",
  async (
    {
      sourceCustomer,
      targetCustomer,
      amount,
    },
    { rejectWithValue }
  ) => {
    try {

      const response =
        await transferAmount(
          sourceCustomer,
          targetCustomer,
          amount
        );

      return response.data;

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Transfer failed"
      );
    }
  }
);

// CUSTOMER DETAILS
export const fetchCustomerAsync =
  createAsyncThunk(
    "atm/customer",
    async (
      name,
      { rejectWithValue }
    ) => {
      try {

        const response =
          await getCustomerDetails(name);

        return response.data;

      } catch (error) {

        return rejectWithValue(
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to fetch customer details"
        );
      }
    }
  );

// TRANSACTION HISTORY
export const fetchTransactionsAsync =
  createAsyncThunk(
    "atm/transactions",
    async (
      name,
      { rejectWithValue }
    ) => {
      try {

        const response =
          await getTransactions(name);

        return response.data;

      } catch (error) {

        return rejectWithValue(
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to fetch transaction history"
        );
      }
    }
  );