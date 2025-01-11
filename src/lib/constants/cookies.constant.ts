import Cookies from "js-cookie";
import { AUTH_TOKEN } from "./api.constant";

export const getToken = () => {
  return Cookies.get(AUTH_TOKEN); // Returns the token if available, or undefined
};
