import "./styles/index.scss";

import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const appRoot = document.getElementById("app-root");

if (!appRoot) {
	throw new Error("app-root element not found");
}

createRoot(appRoot).render(React.createElement(App));
