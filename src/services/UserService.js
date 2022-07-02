import { register as apiRegister } from "../api/UserApi";
import { SOMETHING_WENT_WRONG_MESSAGE, SUCCESSFUL_REGISTRATION_MESSAGE } from "../const/interface";
import { LOGIN_ROUTE } from "../const/routes";
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
        dispatch(setAlertSuccess(SUCCESSFUL_REGISTRATION_MESSAGE))
        dispatch(setAlertDanger(""))
        navigate(LOGIN_ROUTE)
        dispatch(hideLoader())
    }

    const doFail = () => {
        dispatch(hideLoader())
        dispatch(setAlertDanger(SOMETHING_WENT_WRONG_MESSAGE))
    }
}