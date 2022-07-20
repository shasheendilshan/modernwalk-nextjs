import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BallBeat } from "react-pure-loaders";

import { getUser } from "../../services/users.services";
import { useUserContext } from "../../context/userContext";
import { IUser } from "../../interfaces/users/users.interfaces";
import { Button, Input } from "../../components";
import { validateSignIn } from "../../lib/helpers";
import { IValidationProps } from "../../interfaces/global/global.interface";
import {
  setRememberMe,
  getRememberMeDetails,
  removeRememberMeDetails,
} from "../../lib/localStorage";
import style from "./SignIn.module.scss";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<IValidationProps[]>(
    []
  );

  const userCtx = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errorsList = validateSignIn(email, password);

    if (errorsList.length === 0) {
      setValidationErrors(errorsList);
      signInUser(email, password);
    } else {
      setValidationErrors(errorsList);
    }
  };

  const handleEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handlePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  const handleRemember = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(e.target.checked);
  };

  const signInUser = async (email: string, password: string) => {
    const userData: IUser = {
      email,
      password,
    };

    setLoading(true);
    const response = await getUser(userData);
    setLoading(false);

    if (!response.error) {
      if (response?.data.length === 1) {
        userCtx?.setUserDetails(response.data[0]);
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } else {
      setError(response.error.message);
    }
  };

  useEffect(() => {
    if (email !== "" && password !== "" && remember) {
      const user = {
        email: email,
        password: password,
      };

      setRememberMe(user);
    }
    if (email === "" && password === "" && remember) {
      removeRememberMeDetails();
    }
  }, [remember, email, password]);

  useEffect(() => {
    const data = getRememberMeDetails();
    if (data) {
      setEmail(data.email ? data.email : "");
      setPassword(data.password ? data.password : "");
    }
  }, []);

  return (
    <div className={style.mainContainer}>
      <div className={style.loginFromContainer}>
        <div className={style.header}>
          <h2>Sign In</h2>
        </div>
        {error && (
          <div className={style.errorContainer}>
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
          <Input
            name="email"
            type="text"
            label="Email"
            onChange={handleEmail}
            value={email}
            error={
              validationErrors &&
              validationErrors.find((item) => item.email)?.email
            }
          />

          <Input
            name="password"
            type="password"
            label="Password"
            onChange={handlePassword}
            value={password}
            error={
              validationErrors &&
              validationErrors.find((item) => item.password)?.password
            }
          />
          <div className={style.forgotPassword}>
            <p>Forgot Password?</p>
          </div>

          <div className={style.loadingContainer}>
            <BallBeat color={"#2BD9AF"} loading={loading} />
          </div>
          <div className={style.bottomContainer}>
            <div className={style.rememberMe}>
              <input
                type="checkbox"
                name="rememberMe"
                onChange={handleRemember}
              />
              <label htmlFor="">Remember me</label>
            </div>
            <div className={style.LoginBtn}>
              <Button name="Sign In" disable={loading} />
            </div>
          </div>
          <div className={style.createAccount}>
            <label htmlFor="">Not yet register?</label>
            <p
              onClick={() => {
                navigate("/sign-up");
              }}
            >
              Create an account.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
