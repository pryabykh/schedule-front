import { LOGIN_ROUTE } from "../../const/routes";

export const logout = async (navigate) => {
    localStorage.clear();
    navigate(LOGIN_ROUTE)
}