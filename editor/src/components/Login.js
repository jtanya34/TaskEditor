import React, { useState, useEffect } from "react";
import cx from "classnames";
import { Link } from "react-router";

import { setCookie } from "../utils/gen_fun";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (email.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  const handleLogin = () => {
    if (/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/.test(email) && password !== "") {
      setError(false);
      setCookie("login", "true", 30);
      props.history.push("/workflows");
    } else {
      setError(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      isButtonDisabled || handleLogin();
    }
  };

  return (
    <React.Fragment>
      <form className="card" noValidate autoComplete="off">
        <h3>Login</h3>
        <input
          error={error}
          fullWidth
          id="email"
          type="email"
          label="Email"
          placeholder="Email"
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        <input
          error={error}
          fullWidth
          id="password"
          type="password"
          label="Password"
          placeholder="Password"
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        <span className={cx("error", error === false ? "hide" : "")}>
          Enter valid details
        </span>
        <label>
          <input type="checkbox" checked="checked" name="remember" /> Remember
          me
        </label>

        <button
          className="btn"
          onClick={() => handleLogin()}
          disabled={isButtonDisabled}
        >
          Login
        </button>

        <span className="signup">
          Don't have an account?. SignUp <Link to="#">here</Link>{" "}
        </span>
      </form>
    </React.Fragment>
  );
};

export default Login;
