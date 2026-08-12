import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import {
  depositAsync,
  withdrawAsync,
  transferAsync,
  fetchCustomerAsync,
  fetchTransactionsAsync,
} from "../features/atmThunks";

import {
  logout,
  clearError,
} from "../features/atmSlice";

function CommandPanel() {
  const dispatch = useDispatch();

  const user = useSelector(
    (state) => state.atm.user
  );

  const loading = useSelector(
    (state) => state.atm.loading
  );

  const [deposit, setDeposit] = useState("");
  const [withdraw, setWithdraw] = useState("");
  const [target, setTarget] = useState("");
  const [amount, setAmount] = useState("");

  const refreshData = async () => {
    await dispatch(fetchCustomerAsync(user));
    await dispatch(fetchTransactionsAsync(user));
  };

  const handleDeposit = async () => {
    if (!deposit) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please enter a deposit amount",
      });
      return;
    }

    dispatch(clearError());

    const result = await dispatch(
      depositAsync({
        name: user,
        amount: Number(deposit),
      })
    );

    if (depositAsync.rejected.match(result)) {
      Swal.fire({
        icon: "error",
        title: "Deposit Failed",
        text:
          result.payload ||
          result.error?.message,
      });

      return;
    }

    await refreshData();

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Amount deposited successfully",
      timer: 1500,
      showConfirmButton: false,
    });

    setDeposit("");
  };

  const handleWithdraw = async () => {
    if (!withdraw) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please enter a withdrawal amount",
      });
      return;
    }

    dispatch(clearError());

    const result = await dispatch(
      withdrawAsync({
        name: user,
        amount: Number(withdraw),
      })
    );

    if (withdrawAsync.rejected.match(result)) {
      Swal.fire({
        icon: "error",
        title: "Withdrawal Failed",
        text:
          result.payload ||
          result.error?.message,
      });

      return;
    }

    await refreshData();

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Amount withdrawn successfully",
      timer: 1500,
      showConfirmButton: false,
    });

    setWithdraw("");
  };

  const handleTransfer = async () => {
    if (!target || !amount) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text:
          "Please enter customer name and amount",
      });
      return;
    }

    dispatch(clearError());

    const result = await dispatch(
      transferAsync({
        sourceCustomer: user,
        targetCustomer: target,
        amount: Number(amount),
      })
    );

    if (transferAsync.rejected.match(result)) {
      Swal.fire({
        icon: "error",
        title: "Transfer Failed",
        text:
          result.payload ||
          result.error?.message,
      });

      return;
    }

    await refreshData();

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Transfer completed successfully",
      timer: 1500,
      showConfirmButton: false,
    });

    setTarget("");
    setAmount("");
  };

  const handleLogout = () => {
    dispatch(clearError());
    dispatch(logout());
  };

  return (
    <div className="card">
      <h2>ATM Operations</h2>

      <div className="form-group">
        <label>Deposit</label>

        <input
          type="number"
          min="1"
          value={deposit}
          onChange={(e) =>
            setDeposit(e.target.value)
          }
        />

        <button
          className="btn-success"
          onClick={handleDeposit}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : "Deposit"}
        </button>
      </div>

      <div className="form-group">
        <label>Withdraw</label>

        <input
          type="number"
          min="1"
          value={withdraw}
          onChange={(e) =>
            setWithdraw(e.target.value)
          }
        />

        <button
          className="btn-warning"
          onClick={handleWithdraw}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : "Withdraw"}
        </button>
      </div>

      <div className="form-group">
        <label>Transfer To</label>

        <input
          type="text"
          placeholder="Customer Name"
          value={target}
          onChange={(e) =>
            setTarget(e.target.value)
          }
        />

        <input
          type="number"
          min="1"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <button
          className="btn-primary"
          onClick={handleTransfer}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : "Transfer"}
        </button>
      </div>

      <button
        className="btn-danger logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default CommandPanel;