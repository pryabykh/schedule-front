import React from 'react'
import { useSelector } from 'react-redux'
import style from './alert-danger.module.css'

function AlertDanger() {
    const alertDangerText = useSelector((state) => state.rootReducer.appReducer.alertDangerText)

    const alertDanger = (
        <div className={style["alert-danger-container"]}>
        <div className="alert alert-danger" role="alert">
            {alertDangerText}
        </div>
    </div>
    )

    return (
        alertDangerText.length > 0 ? alertDanger : <></>
    );
}

export default AlertDanger;