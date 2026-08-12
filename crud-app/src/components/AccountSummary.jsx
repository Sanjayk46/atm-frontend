import { useSelector } from "react-redux";

function AccountSummary() {
  const customer = useSelector(
    (state) => state.atm.customer
  );

  if (!customer) return null;

  return (
    <div className="card account-card">
      <h2>Hello, {customer.name}</h2>

      <div className="balance-card">
        <h3>Current Balance</h3>

        <h1>${customer.balance}</h1>
      </div>

      <div className="info-block">
        <h3>Amounts You Owe</h3>

        {Object.keys(customer.debts || {}).length ===
        0 ? (
          <p>No outstanding debts</p>
        ) : (
          <ul>
            {Object.entries(
              customer.debts
            ).map(([name, amount]) => (
              <li key={name}>
                {name} : ${amount}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="info-block">
        <h3>Receivables</h3>

        {Object.keys(
          customer.receivables || {}
        ).length === 0 ? (
          <p>None</p>
        ) : (
          <ul>
            {Object.entries(
              customer.receivables
            ).map(([name, amount]) => (
              <li key={name}>
                {name} owes you ${amount}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AccountSummary;