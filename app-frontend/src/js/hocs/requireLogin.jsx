import { Global } from "../Store";
import { Login } from "../components/Login";
export const requireLogin = async (component) => {
  const { user } = Global.state;
  return user ? component : <Login />;
};
