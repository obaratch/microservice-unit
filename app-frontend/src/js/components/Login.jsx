import React from "react";
import { HttpClient } from "../utils/HttpUilts";

export const Login = () => {
  const refs = { loginid: React.createRef(), password: React.createRef() };

  const onSubmit = async () => {
    const onetime = await HttpClient.get("api/login/onetime");
    console.log({ onetime });
    const id = refs.loginid.current.value;
    const password = refs.password.current.value;
    HttpClient.post("api/login", { id, password });
  };

  return (
    <div className="login-backdrop">
      <div className="login-box">
        <div className="title">Login BOX</div>
        <ul className="fields">
          <li className="loginid">
            <input type="text" ref={refs.loginid} />
          </li>
          <li className="password">
            <input type="password" ref={refs.password} />
          </li>
        </ul>
        <div className="control">
          <button className="submit" onClick={onSubmit}>
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};
