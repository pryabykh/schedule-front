import { refresh as apiRefresh } from "../../api/AuthApi";
import { ACCESS_DATA, ACCESS_EXPIRES_AT, ACCESS_TOKEN, REFRESH_EXPIRES_AT, REFRESH_TOKEN } from "../../const/local-storage";
import { LOGIN_ROUTE } from "../../const/routes";
import { logout } from "./LogoutAuthService";

export const refresh = async (navigate) => {
    const refreshToken = {
        "refreshToken": JSON.parse(localStorage.getItem(ACCESS_DATA))[REFRESH_TOKEN]
    }
    apiRefresh(refreshToken).then(
        (response) => {
            if(response.ok) {
                doSuccess(response)
            }  else {
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

    const doFail = () => {
        logout(navigate)
    }
}