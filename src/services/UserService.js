import { register as apiRegister } from "../api/UserApi";
import { hideLoader, setAlertDanger, setAlertSuccess, showLoader } from "../store/appSlice";

export const register = async (user, navigate, dispatch) => {
    dispatch(showLoader())
    apiRegister(user).then(() => {
        dispatch(setAlertSuccess("Регистрация прошла успешно, Вы можете войти в личный кабинет."))
        dispatch(setAlertDanger(""))
        navigate("/login")
        dispatch(hideLoader())
    }, () => {
        dispatch(hideLoader())
        dispatch(setAlertDanger("Что-то пошло не так. Попробуйте снова через некоторое время."))
    })
}