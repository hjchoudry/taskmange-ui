import { useSelector } from "react-redux";
import {
	getCurrentUser,
	getAccessToken,
	getIsAuthenticated,
} from "./selectors";

const useIsAuthenticated = () => useSelector(getIsAuthenticated);
const useCurrentUser = () => useSelector(getCurrentUser);
const useAccessToken = () => useSelector(getAccessToken);
export { useCurrentUser, useIsAuthenticated, useAccessToken };