import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const SignUp = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const { signup, loading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(state.email, state.password);
  };
  return (
    <form className="signup" onSubmit={(e) => handleSubmit(e)}>
      <h3>Signup</h3>
      {error && <div className="error">{error}</div>}
      <label>Email:</label>
      <input
        type="email"
        placeholder="Email"
        value={state.email}
        onChange={(e) => setState({ ...state, email: e.target.value })}
      />
      <label>Password:</label>
      <input
        type="password"
        placeholder="Password"
        value={state.password}
        onChange={(e) => setState({ ...state, password: e.target.value })}
      />
      <button>Sign Up</button>
    </form>
  );
};

export default SignUp;
