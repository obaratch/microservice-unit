import React from "react";
import { login } from "./utils/SyncedStore";

export const SyncedStorePage = () => {
  const onClickLogin = () => {
    login({ id: "test1" });
  };

  return (
    <div className="main synced-store">
      <div className="login">
        <label>User</label>
        <input type="text" defaultValue="test1" />
        <button onClick={onClickLogin}>LOGIN</button>
      </div>
    </div>
  );
};
