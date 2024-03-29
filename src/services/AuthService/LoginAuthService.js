import { login as apiLogin } from "../../api/AuthApi";
import { FORBIDDEN_MESSAGE, SOMETHING_WENT_WRONG_MESSAGE } from "../../const/interface";
import { ACCESS_DATA, ACCESS_EXPIRES_AT, ACCESS_TOKEN, REFRESH_EXPIRES_AT, REFRESH_TOKEN } from "../../const/local-storage";
import { LK_ROUTE } from "../../const/routes";
import { hideLoader, setAlertDanger, setAlertSuccess, setAlertWarning, showLoader } from "../../store/appSlice";

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
        dispatch(setAlertWarning(""))
        dispatch(setAlertSuccess(""))
        dispatch(hideLoader())
        navigate(LK_ROUTE)
    }

    const setTokenToLocalStorage = (content) => {
        const dataForLocalStorage = {
            [ACCESS_TOKEN]: content.accessToken,
            [REFRESH_TOKEN]: content.refreshToken,
            [ACCESS_EXPIRES_AT]: (Date.now() + (content.expiresIn * 1000)).toString(),
            [REFRESH_EXPIRES_AT]: (Date.now() + (content.refreshExpiresIn * 1000)).toString()
        }
        localStorage.setItem(ACCESS_DATA, JSON.stringify(dataForLocalStorage)) //JSON.parse(jsonString)
    }

    const doForbidden = () => {
        dispatch(hideLoader())
        dispatch(setAlertSuccess(""))
        dispatch(setAlertWarning(""))
        dispatch(setAlertDanger(FORBIDDEN_MESSAGE))
    }

    const doFail = () => {
        dispatch(hideLoader())
        dispatch(setAlertSuccess(""))
        dispatch(setAlertWarning(""))
        dispatch(setAlertDanger(SOMETHING_WENT_WRONG_MESSAGE))
    }
}