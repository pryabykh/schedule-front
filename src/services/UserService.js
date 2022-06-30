import { register as apiRegister } from "../api/UserApi";
import { hideLoader, showLoader } from "../store/appSlice";
import { showNotificationSuccessLoginPage } from "../store/loginPageSlice";

export const register = async (user, navigate, dispatch) => {
    dispatch(showLoader())
    apiRegister(user).then(() => {
        dispatch(showNotificationSuccessLoginPage("Регистрация прошла успешно, Вы можете войти в личный кабинет."))
        navigate("/login")
        dispatch(hideLoader)
    }, () => {
        //dispatch alert with error
        dispatch(hideLoader)
    })
}