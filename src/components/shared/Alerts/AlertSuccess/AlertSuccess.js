import React from 'react'
import './Style.css'
import { useSelector } from 'react-redux'

function AlertSuccess() {
    const alertSuccessText = useSelector((state) => state.rootReducer.appReducer.alertSuccessText)

    const alertSuccess = (
        <div className="alert-success-container">
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