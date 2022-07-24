import { fetchAllList as apiFetchAllList } from "../../api/SubjectApi";
import { SOMETHING_WENT_WRONG_MESSAGE } from "../../const/interface";
import { ACCESS_DATA } from "../../const/local-storage";
import { hideLoader, setAlertDanger, setAlertSuccess, setAlertWarning, showLoader } from "../../store/appSlice";
import { setChangedSubjects, setChangedTeachers, setSubjects, setTeachers } from "../../store/ClassroomPageSlice";
import { logout } from "../AuthService/LogoutAuthService";
import { refresh } from "../AuthService/RefreshAuthService";

export const fetchAllList = (navigate, dispatch) => {
    if(!tokenExists()) {
        logout(navigate, dispatch)
        return;
    }

    const doSuccess = async (response) => {
        const responseJson = await response.json();
        const subjects = responseJson.map((subject) => {
            return {
                id: subject.id,
                value: subject.name
            }
        })
        
        dispatch(setSubjects(subjects))
        dispatch(setChangedSubjects(subjects))
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
    return apiFetchAllList().then((response) => {
        if(response.ok) {
            doSuccess(response)
        } else if(response.status === 401) {
            refresh(navigate, dispatch).then(() => {
                dispatch(hideLoader())
                fetchAllList(navigate, dispatch)
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