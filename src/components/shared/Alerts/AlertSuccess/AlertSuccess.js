import React from 'react'
import { useSelector } from 'react-redux'
import cn from 'classnames';
import style from './alert-success.module.css'

function AlertSuccess() {
    const alertSuccessText = useSelector((state) => state.rootReducer.appReducer.alertSuccessText)

    const alertClassNames = cn(style["alert-success"], 'alert', 'alert-success')

    const alertSuccess = (
        <div className={style["alert-success-container"]}>
        <div className={alertClassNames} role="alert">
            {alertSuccessText}
        </div>
    </div>
    )

    return (
        alertSuccessText.length > 0 ? alertSuccess : <></>
    );
}

export default AlertSuccess;