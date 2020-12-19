import React from "react";
import { useIsAuthenticated } from "../auth/hooks";
import Front from "./Front";
import Home from "./Home";

export default () => {
  const authenticated = useIsAuthenticated();
  return <>{authenticated ? <Home /> : <Front />}</>;
};
