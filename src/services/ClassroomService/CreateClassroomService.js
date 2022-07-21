import { create as apiCreate } from "../../api/ClassroomApi";
import { CONFLICT_CLASSROOM_MESSAGE, SOMETHING_WENT_WRONG_MESSAGE } from "../../const/interface";
import { ACCESS_DATA } from "../../const/local-storage";
import { hideLoader, setAlertDanger, setAlertSuccess, setAlertWarning, showLoader } from "../../store/appSlice";
import { hideCreateModal, resetCreateForm } from "../../store/ClassroomPageSlice";
import { logout } from "../AuthService/LogoutAuthService";
import { refresh } from "../AuthService/RefreshAuthService";
import { fetchAll } from "./FetchAllClassroomService";

export const create = async (classroom, lastPageSizeRequest, navigate, dispatch) => {
    if(!tokenExists()) {
        logout(navigate, dispatch)
        return;
    }

    const doSuccess = async (response) => {
        const responseJson = await response.json();
        dispatch(setAlertWarning(""))
        dispatch(setAlertDanger(""))
        dispatch(setAlertSuccess(""))
        dispatch(hideLoader())
    }

    const doConflict = () => {
        dispatch(setAlertSuccess(""))
        dispatch(setAlertDanger(""))
        dispatch(setAlertWarning(CONFLICT_CLASSROOM_MESSAGE))
        dispatch(hideLoader())
    }

    const doFail = () => {
        dispatch(setAlertSuccess(""))
        dispatch(setAlertWarning(""))
        dispatch(setAlertDanger(SOMETHING_WENT_WRONG_MESSAGE))
        dispatch(hideLoader())
    }

    dispatch(showLoader())
    return apiCreate(classroom).then((response) => {
        if(response.ok) {
            doSuccess(response)
            fetchAll(lastPageSizeRequest, navigate, dispatch).then(() => {
                dispatch(hideCreateModal())
                dispatch(resetCreateForm())
            })
        } else if(response.status === 401) {
            refresh(navigate, dispatch).then(() => {
                create(classroom, navigate, dispatch)
            });
        } else if(response.status === 409) {
            doConflict()
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