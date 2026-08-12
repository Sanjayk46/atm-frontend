import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTransactionsAsync }
  from "../features/atmThunks";

function TransactionHistory() {

  const dispatch = useDispatch();

  const user = useSelector(
    state => state.atm.user
  );

  const transactions = useSelector(
    state => state.atm.transactions
  );

  useEffect(() => {

    if (user) {

      dispatch(
        fetchTransactionsAsync(user)
      );

    }

  }, [dispatch, user]);

  return (
    <div className="card">
      <h2>Transaction History</h2>

      {transactions.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        <div>

          {transactions.map(txn => (

            <div
              key={txn.id}
              className="transaction-item"
            >
              <p>
                {txn.description}
              </p>

              <small>
                {new Date(
                  txn.transactionTime
                ).toLocaleString()}
              </small>

            </div>

          ))}

        </div>
      )}
    </div>
  );
}

export default TransactionHistory;