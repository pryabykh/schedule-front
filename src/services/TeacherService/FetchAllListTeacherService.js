import { fetchAllList as apiFetchAllList } from "../../api/TeacherApi";
import { SOMETHING_WENT_WRONG_MESSAGE } from "../../const/interface";
import { ACCESS_DATA } from "../../const/local-storage";
import { hideLoader, setAlertDanger, setAlertSuccess, setAlertWarning, showLoader } from "../../store/appSlice";
import { setChangedTeachers, setTeachers } from "../../store/ClassroomPageSlice";
import { logout } from "../AuthService/LogoutAuthService";
import { refresh } from "../AuthService/RefreshAuthService";

export const fetchAllList = async (navigate, dispatch) => {
    if(!tokenExists()) {
        logout(navigate, dispatch)
        return;
    }

    const doSuccess = async (response) => {
        const responseJson = await response.json();
        const teachers = responseJson.map((teacher) => {
            return {
                id: teacher.id,
                value: teacher.lastName + " " + teacher.firstName + " " + teacher.patronymic
            }
        })
        
        dispatch(setTeachers(teachers))
        dispatch(setChangedTeachers(teachers))
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
                apiFetchAllList(navigate, dispatch)
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