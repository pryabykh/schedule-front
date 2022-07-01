import { register as apiRegister } from "../api/UserApi";
import { hideLoader, setAlertDanger, setAlertSuccess, showLoader } from "../store/appSlice";

export const register = async (user, navigate, dispatch) => {
    dispatch(showLoader())
    apiRegister(user).then((response) => {
        if(response.ok) {
            doSuccess()
        } else {
            doFail()
        }
    }, () => {
        doFail()
    })

    const doSuccess = () => {
        dispatch(setAlertSuccess("Регистрация прошла успешно, Вы можете войти в личный кабинет."))
        dispatch(setAlertDanger(""))
        navigate("/login")
        dispatch(hideLoader())
    }

    const doFail = () => {
        dispatch(hideLoader())
        dispatch(setAlertDanger("Что-то пошло не так. Попробуйте снова через некоторое время."))
    }
}