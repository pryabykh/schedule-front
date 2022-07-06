import React from 'react'
import { useSelector } from 'react-redux'
import cn from 'classnames';
import style from './alert-warning.module.css'

function AlertWarning() {
    const alertWarningText = useSelector((state) => state.rootReducer.appReducer.alertWarningText)

    const alertClassNames = cn(style["alert-warning"], 'alert', 'alert-warning')

    const alertWarning = (
        <div className={style["alert-warning-container"]}>
        <div className={alertClassNames} role="alert">
            {alertWarningText}
        </div>
    </div>
    )

    return (
        alertWarningText.length > 0 ? alertWarning : <></>
    );
}

export default AlertWarning;