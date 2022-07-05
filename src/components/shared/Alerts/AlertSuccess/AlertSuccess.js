import React from 'react'
import { useSelector } from 'react-redux'
import style from './alert-success.module.css'

function AlertSuccess() {
    const alertSuccessText = useSelector((state) => state.rootReducer.appReducer.alertSuccessText)

    const alertSuccess = (
        <div className={style["alert-success-container"]}>
        <div className="alert alert-success" role="alert">
            {alertSuccessText}
        </div>
    </div>
    )

    return (
        alertSuccessText.length > 0 ? alertSuccess : <></>
    );
}

export default AlertSuccess;