import React from "react";
import { Global } from "../Store";
import { Login } from "../components/Login";
export const requireLogin = (component) => () => {
  const { user } = Global.state;
  console.log("requireLogin", { user });
  return user ? component : <Login />;
};
