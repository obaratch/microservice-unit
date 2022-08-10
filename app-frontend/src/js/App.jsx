import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { HttpCilent } from "./utils/HttpUilts";
import { APP_VERSION, BUILD_TIME } from "./config";

import { requireLogin } from "./hocs/requireLogin";

const Home = requireLogin(() => {
  return (
    <div className="main home">
      <h1>
        Hello Vite <i className="fab fa-font-awesome-flag" />
      </h1>
      <ul className="menu">
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </div>
  );
});

const Users = () => {
  const [users, setUsers] = React.useState();
  React.useEffect(async () => {
    if (users) return;
    setUsers(await HttpCilent.get("/api/users"));
  });
  console.log({ users });
  if (!users) return null;
  const list = users.map(({ id, name }) => (
    <li className="user" key={id}>
      {name} ({id})
    </li>
  ));
  return (
    <div className="main users">
      <ul>{list}</ul>
    </div>
  );
};

export const App = () => {
  React.useEffect(() => {
    HttpCilent.get("/healthcheck").then((health) => {
      console.log({ health });
    });
  }, []);
  return (
    <div className="app-outer">
      <BrowserRouter>
        <header>
          <Link to="/">
            <div className="logo">Micro Vite App Example</div>
            <span className="version">v{APP_VERSION}</span>
            <span className="buildtime">build: {BUILD_TIME.toISOString()}</span>
          </Link>
        </header>
        <Routes>
          <Route index component={Home} />
          <Route path="/users" component={Users} />
        </Routes>
      </BrowserRouter>
      <footer>(c) Obalab 2021</footer>
    </div>
  );
};
