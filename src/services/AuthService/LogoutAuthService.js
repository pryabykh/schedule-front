import { LOGIN_ROUTE } from "../../const/routes";
import { hideLoader } from "../../store/appSlice";

export const logout = async (navigate, dispatch) => {
    localStorage.clear()
    dispatch(hideLoader())
    navigate(LOGIN_ROUTE)
}