import { useState } from "react";
import { useDispatch } from "react-redux";
import {showWarningAlert,showSuccessAlert,showErrorAlert} from './alertUtil';

import { loginAsync } from "../features/atmThunks";

function LoginForm() {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async () => {

    if (!name.trim()) {
      showWarningAlert(
        "Validation Error",
        "Customer name is required"
      );
      return;
    }
  
    const result = await dispatch(
      loginAsync(name.trim())
    );
  
    if (loginAsync.rejected.match(result)) {
  
      showErrorAlert(
        "Login Failed",
        result.payload ||
        result.error?.message
      );
  
      return;
    }
  
    showSuccessAlert(
      "Login Successful",
      `Welcome ${name}`
    );
  };
  return (
    <div className="card">
      <h2>Login</h2>

      <input
        type="text"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        placeholder="Customer Name"
      />

      <button
        className="btn-primary"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}

export default LoginForm;