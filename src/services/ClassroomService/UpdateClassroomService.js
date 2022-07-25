import { update as apiUpdate} from "../../api/ClassroomApi";
import { CONFLICT_CLASSROOM_MESSAGE, SOMETHING_WENT_WRONG_MESSAGE } from "../../const/interface";
import { ACCESS_DATA } from "../../const/local-storage";
import { hideLoader, setAlertDanger, setAlertSuccess, setAlertWarning, showLoader } from "../../store/appSlice";
import { hideCreateModal, hideUpdateModal, resetCreateForm, resetUpdateForm } from "../../store/ClassroomPageSlice";
import { logout } from "../AuthService/LogoutAuthService";
import { refresh } from "../AuthService/RefreshAuthService";
import { fetchAll } from "./FetchAllClassroomService";

export const update = (id, classroom, lastPageSizeRequest, navigate, dispatch) => {
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
    return apiUpdate(id, classroom).then((response) => {
        if(response.ok) {
            doSuccess(response)
            fetchAll(lastPageSizeRequest, navigate, dispatch).then(() => {
                dispatch(hideUpdateModal())
                dispatch(resetUpdateForm())
            })
        } else if(response.status === 401) {
            refresh(navigate, dispatch).then(() => {
                dispatch(hideLoader())
                update(id, classroom, lastPageSizeRequest, navigate, dispatch)
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