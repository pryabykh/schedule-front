import React from 'react'
import { useSelector } from 'react-redux'
import cn from 'classnames';
import style from './alert-danger.module.css'

function AlertDanger() {
    const alertDangerText = useSelector((state) => state.rootReducer.appReducer.alertDangerText)

    const alertClassNames = cn(style["alert-danger"], 'alert', 'alert-danger')

    const alertDanger = (
        <div className={style["alert-danger-container"]}>
        <div className={alertClassNames} role="alert">
            {alertDangerText}
        </div>
    </div>
    )

    return (
        alertDangerText.length > 0 ? alertDanger : <></>
    );
}

export default AlertDanger;