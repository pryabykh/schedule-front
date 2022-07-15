import { fetchAll as apiFetchAll } from "../../api/ClassroomApi";
import { CONFLICT_MESSAGE, SOMETHING_WENT_WRONG_MESSAGE, SUCCESSFUL_REGISTRATION_MESSAGE } from "../../const/interface";
import { ACCESS_DATA, ACCESS_TOKEN } from "../../const/local-storage";
import { LOGIN_ROUTE } from "../../const/routes";
import { hideLoader, setAlertDanger, setAlertSuccess, setAlertWarning, showLoader } from "../../store/appSlice";
import { logout } from "../AuthService/LogoutAuthService";
import { refresh } from "../AuthService/RefreshAuthService";

export const fetchAll = async (pageSize, navigate, dispatch) => {
    if(!tokenExisting()) {
        logout(navigate)
        return;
    }
    dispatch(showLoader())
    apiFetchAll(pageSize).then((response) => {
        if(response.ok) {
            doSuccess(response)
        } else if(response.status === 401) {
            console.log("GOt 401")
            refresh(navigate)
            fetchAll(pageSize, navigate, dispatch)
        } else {
            doFail()
        }
    }, () => {
        doFail()
    })

    const doSuccess = async (response) => {
        const content = await response.json();
        console.log(content)
        dispatch(setAlertWarning(""))
        dispatch(setAlertDanger(""))
        dispatch(setAlertSuccess(""))
        dispatch(hideLoader())
    }

    const doFail = () => {
        dispatch(setAlertSuccess(""))
        dispatch(setAlertWarning(""))
        dispatch(setAlertDanger(SOMETHING_WENT_WRONG_MESSAGE))
        dispatch(hideLoader())
    }
}

const tokenExisting = () => {
    if(JSON.parse(localStorage.getItem(ACCESS_DATA))[ACCESS_TOKEN]) {
        return true;
    } else {
        return false;
    }
}