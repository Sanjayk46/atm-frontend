import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/atm",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginCustomer = (name) =>
  api.post("/login", { name });

export const logoutCustomer = (name) =>
  api.post("/logout", { name });

export const depositAmount = (name, amount) =>
  api.post("/deposit", {
    name,
    amount,
  });

export const withdrawAmount = (name, amount) =>
  api.post("/withdraw", {
    name,
    amount,
  });

export const transferAmount = (
  sourceCustomer,
  targetCustomer,
  amount
) =>
  api.post("/transfer", {
    sourceCustomer,
    targetCustomer,
    amount,
  });

export const getCustomerDetails = (name) =>
  api.get(`/customer/${name}`);

  export const getTransactions = (name) =>
  api.get(`/customer/${name}/transactions`);