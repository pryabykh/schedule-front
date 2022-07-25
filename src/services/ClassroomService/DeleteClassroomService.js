import { remove as apiRemove } from "../../api/ClassroomApi";
import { CONFLICT_CLASSROOM_MESSAGE, SOMETHING_WENT_WRONG_MESSAGE } from "../../const/interface";
import { ACCESS_DATA } from "../../const/local-storage";
import { hideLoader, setAlertDanger, setAlertSuccess, setAlertWarning, showLoader } from "../../store/appSlice";
import { hideCreateModal, hideUpdateModal, resetCreateForm, resetUpdateForm } from "../../store/ClassroomPageSlice";
import { logout } from "../AuthService/LogoutAuthService";
import { refresh } from "../AuthService/RefreshAuthService";
import { fetchAll } from "./FetchAllClassroomService";

export const remove = (id, lastPageSizeRequest, navigate, dispatch) => {
    if(!tokenExists()) {
        logout(navigate, dispatch)
        return;
    }

    const doSuccess = async (response) => {
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

    dispatch(showLoader())
    return apiRemove(id).then((response) => {
        if(response.ok) {
            doSuccess(response)
            fetchAll(lastPageSizeRequest, navigate, dispatch).then(() => {
                dispatch(dispatch(hideUpdateModal()))
                dispatch(resetUpdateForm())
                dispatch(hideLoader())
            })
        } else if(response.status === 401) {
            refresh(navigate, dispatch).then(() => {
                dispatch(hideLoader())
                remove(id, lastPageSizeRequest, navigate, dispatch)
            });
        } else {
            doFail()
        }
    }, () => {
        doFail()
    })
}

const tokenExists = () => {
    if(JSON.parse(localStorage.getItem(ACCESS_DATA))) {
        return true;
    } else {
        return false;
    }
}