import { login as apiLogin } from "../api/AuthApi";
import { ACCESS_EXPIRES_AT, ACCESS_TOKEN, REFRESH_EXPIRES_AT, REFRESH_TOKEN } from "../const/local-storage";
import { hideLoader, setAlertDanger, setAlertSuccess, showLoader } from "../store/appSlice";

export const login = async (credentials, navigate, dispatch) => {
    dispatch(showLoader())
    apiLogin(credentials).then(
        (response) => {
            if(response.ok) {
                doSuccess(response)
            } else if(response.status === 403) {
                doForbidden()
            } else {
                doFail()
            }
        },
        () => {
            doFail()
        }
    )

    const doSuccess = async (response) => {
        const content = await response.json();
        setTokenToLocalStorage(content)
        dispatch(setAlertDanger(""))
        dispatch(hideLoader())
        navigate("/lk")
    }

    const setTokenToLocalStorage = (content) => {
        localStorage.setItem(ACCESS_TOKEN, content.accessToken)
        localStorage.setItem(REFRESH_TOKEN, content.refreshToken)
        localStorage.setItem(ACCESS_EXPIRES_AT, Date.now + (content.expiresIn * 1000))
        localStorage.setItem(REFRESH_EXPIRES_AT, Date.now + (content.refreshExpiresIn * 1000))
    }

    const doForbidden = () => {
        dispatch(hideLoader())
        dispatch(setAlertSuccess(""))
        dispatch(setAlertDanger("Неверный email или пароль."))
    }

    const doFail = () => {
        dispatch(hideLoader())
        dispatch(setAlertSuccess(""))
        dispatch(setAlertDanger("Что-то пошло не так. Попробуйте снова через некоторое время."))
    }
}