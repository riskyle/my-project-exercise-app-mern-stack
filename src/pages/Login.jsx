// import AuthForm from "../components/AuthForm";

import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const { login, error, loading } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(state.email, state.password);
  };
  return (
    <form className="login" onSubmit={(e) => handleSubmit(e)}>
      <h3>Login</h3>
      {error && <div className="error">{error}</div>}
      <label>Email:</label>
      <input
        type="email"
        placeholder="Email"
        defaultValue={state.email}
        onChange={(e) => setState({ ...state, email: e.target.value })}
      />
      <label>Password:</label>
      <input
        type="password"
        placeholder="Password"
        defaultValue={state.password}
        onChange={(e) => setState({ ...state, password: e.target.value })}
      />
      <button
        disabled={loading}
        style={{ cursor: loading ? "progress" : "pointer" }}
      >
        Login
      </button>
    </form>
  );
};

export default Login;
