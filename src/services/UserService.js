import { register as apiRegister } from "../api/UserApi";
import { CONFLICT_MESSAGE, SOMETHING_WENT_WRONG_MESSAGE, SUCCESSFUL_REGISTRATION_MESSAGE } from "../const/interface";
import { LOGIN_ROUTE } from "../const/routes";
import { hideLoader, setAlertDanger, setAlertSuccess, setAlertWarning, showLoader } from "../store/appSlice";

export const register = async (user, navigate, dispatch) => {
    dispatch(showLoader())
    apiRegister(user).then((response) => {
        if(response.ok) {
            doSuccess()
        } else if(response.status === 409) {
            doConflict()
        } else {
            doFail()
        }
    }, () => {
        doFail()
    })

    const doSuccess = () => {
        
        dispatch(setAlertWarning(""))
        dispatch(setAlertDanger(""))
        dispatch(setAlertSuccess(SUCCESSFUL_REGISTRATION_MESSAGE))
        navigate(LOGIN_ROUTE)
        dispatch(hideLoader())
    }

    const doConflict = () => {
        dispatch(setAlertSuccess(""))
        dispatch(setAlertDanger(""))
        dispatch(setAlertWarning(CONFLICT_MESSAGE))
        dispatch(hideLoader())
    }

    const doFail = () => {
        dispatch(setAlertSuccess(""))
        dispatch(setAlertWarning(""))
        dispatch(setAlertDanger(SOMETHING_WENT_WRONG_MESSAGE))
        dispatch(hideLoader())
    }
}