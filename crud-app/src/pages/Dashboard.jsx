import AccountSummary from "../components/AccountSummary";
import CommandPanel from "../components/CommandPanel";
import TransactionHistory from "../components/TransactionHistory";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="left-panel">
        <AccountSummary />
      </div>

      <div className="right-panel">
        <CommandPanel />
        <TransactionHistory />
      </div>
    </div>
  );
}

export default Dashboard;