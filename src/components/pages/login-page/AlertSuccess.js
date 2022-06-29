function AlertSuccess({ text }) {
    return (
        <div className="alert-success-container">
            <div className="alert alert-success" role="alert">
                {text}
            </div>
        </div>
    );
}

export default AlertSuccess;