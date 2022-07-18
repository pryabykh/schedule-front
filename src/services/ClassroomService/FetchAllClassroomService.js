import { fetchAll as apiFetchAll } from "../../api/ClassroomApi";
import { SOMETHING_WENT_WRONG_MESSAGE } from "../../const/interface";
import { ACCESS_DATA } from "../../const/local-storage";
import { hideLoader, setAlertDanger, setAlertSuccess, setAlertWarning, showLoader } from "../../store/appSlice";
import { setClassrooms, setPages, setPageSizeRequest } from "../../store/ClassroomPageSlice";
import { logout } from "../AuthService/LogoutAuthService";
import { refresh } from "../AuthService/RefreshAuthService";

export const fetchAll = async (pageSize, navigate, dispatch) => {
    if(!tokenExists()) {
        logout(navigate, dispatch)
        return;
    }

    const doSuccess = async (response) => {
        const responseJson = await response.json();
        dispatch(setClassrooms(responseJson.content))
        dispatch(setPageSizeRequest(pageSize))
        dispatch(setPages({
            totalElements: responseJson.totalElements, 
            totalPages: responseJson.totalPages, 
            currentPage: responseJson.pageable.pageNumber
        }))
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
    apiFetchAll(pageSize).then((response) => {
        if(response.ok) {
            doSuccess(response)
        } else if(response.status === 401) {
            refresh(navigate, dispatch).then(() => {
                fetchAll(pageSize, navigate, dispatch)
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