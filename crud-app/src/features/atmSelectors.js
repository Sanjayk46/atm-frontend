export const selectUser = (state) =>
  state.atm.user;

export const selectCustomer = (
  state
) => state.atm.customer;

export const selectBalance = (
  state
) =>
  state.atm.customer?.balance || 0;

export const selectHistory = (
  state
) => state.atm.history;

export const selectLoading = (
  state
) => state.atm.loading;

export const selectError = (
  state
) => state.atm.error;