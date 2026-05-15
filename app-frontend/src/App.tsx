import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { APP_VERSION, BUILD_TIME } from "./config";
import { formatEpochMillisecondsInBrowserTimeZone } from "./utils/DatetimeUtils";
import { HttpClient } from "./utils/HttpUilts";

type User = {
	id: string;
	name: string;
};

const Home = () => {
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
};

const Users = () => {
	const [users, setUsers] = React.useState<User[]>();
	React.useEffect(() => {
		if (users) return;
		const fetchUsers = async () => {
			setUsers(await HttpClient.get("/api/users"));
		};
		fetchUsers();
	}, [users]);
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
		const fetchHealth = async () => {
			const health = await HttpClient.get("/healthcheck");
			console.log({ health });
		};
		fetchHealth();
	}, []);
	return (
		<div className="app-outer">
			<BrowserRouter>
				<header>
					<Link to="/">
						<div className="logo">Micro Vite App Example</div>
						<span className="version">v{APP_VERSION}</span>
						<span className="buildtime">
							build: {formatEpochMillisecondsInBrowserTimeZone(BUILD_TIME)}
						</span>
					</Link>
				</header>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/users" element={<Users />} />
				</Routes>
			</BrowserRouter>
			<footer>(c) Obalab 2026</footer>
		</div>
	);
};
