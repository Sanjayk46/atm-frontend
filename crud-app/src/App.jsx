import "./styles/app.css";
import { useSelector } from "react-redux";

import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import Dashboard from "./pages/Dashboard";
import ErrorBanner from "./components/ErrorBanner";

function App() {
  const user = useSelector(
    (state) => state.atm.user
  );

  const error = useSelector(
    (state) => state.atm.error
  );

  return (
    <div className="app">
      <Header />

      {!user ? (
        <LoginForm />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;