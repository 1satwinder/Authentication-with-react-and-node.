import React from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {useToken} from '../auth/useToken';

export const SignUpPage = () => {
  const [token, setToken] = useToken();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const onSignUpClicked = async () => {
    const response = await axios.post('/api/signup',{
      email: emailValue,
      password: passwordValue
    });
    const {token} = response.data;
    setToken(token);
    history.push('/please-verify');
  };
  return (
    <div className="content-container">
      <h1>Sign Up</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <input
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        type="email"
        placeholder="something@gmail.com"
      />
      <input
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        type="password"
        placeholder="password"
      />
      <input
        value={confirmPasswordValue}
        onChange={(e) => setConfirmPasswordValue(e.target.value)}
        type="password"
        placeholder="confirm password"
      />
      <hr />
      <button
        disabled={
          !emailValue ||
          !passwordValue ||
          passwordValue !== confirmPasswordValue
        }
        onClick={onSignUpClicked}
      >
        SignUP
      </button>
      <button onClick={() => history.push("/forgotpassword")}>
        Forgot your password?
      </button>
      <button onClick={() => history.push("/login")}>
        Already have an account! Log In
      </button>
    </div>
  );
};
