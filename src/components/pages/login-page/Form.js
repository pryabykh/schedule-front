import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../services/AuthService'
import style from './login.module.css'
import FormInput from '../../shared/FormInput/FormInput'
import { EMAIL_INPUT_LABEL, EMAIL_INVALID_INPUT_MESSAGE, PASSWORD_INPUT_LABEL, PASSWORD_INVALID_INPUT_MESSAGE } from '../../../const/interface'
import { EMAIL_INPUT_NAME, INPUT_MAX_LENGTH, PASSWORD_INPUT_NAME } from '../../../const/inputs'
import { INPUT_FOCUSED, INPUT_SHOW_VALIDATION_ERROR, INPUT_VALID, ON_BLUR, ON_CHANGE } from '../../../const/validation'
import { validate } from './FormValidation'

function Form() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const validationStatus = {
        emailInputValid: useSelector((state) => state.rootReducer.loginPageReducer[EMAIL_INPUT_NAME + INPUT_VALID]),
        emailInputFocused: useSelector((state) => state.rootReducer.loginPageReducer[EMAIL_INPUT_NAME + INPUT_FOCUSED]),
        emailInputShowValidationError: useSelector((state) => state.rootReducer.loginPageReducer[EMAIL_INPUT_NAME + INPUT_SHOW_VALIDATION_ERROR]),

        passwordInputValid: useSelector((state) => state.rootReducer.loginPageReducer[PASSWORD_INPUT_NAME + INPUT_VALID]),
        passwordInputFocused: useSelector((state) => state.rootReducer.loginPageReducer[PASSWORD_INPUT_NAME + INPUT_FOCUSED]),
        passwordInputShowValidationError: useSelector((state) => state.rootReducer.loginPageReducer[PASSWORD_INPUT_NAME + INPUT_SHOW_VALIDATION_ERROR]),
    }

    const inputs = [
        {
            key: 1,
            id: EMAIL_INPUT_NAME,
            name: EMAIL_INPUT_NAME,
            label: EMAIL_INPUT_LABEL,
            type: "email",
            valid: validationStatus['emailInputValid'],
            focused: validationStatus['emailInputFocused'],
            invalidText: EMAIL_INVALID_INPUT_MESSAGE,
            showValidationError: validationStatus['emailInputShowValidationError']
        },
        {
            key: 2,
            id: PASSWORD_INPUT_NAME,
            name: PASSWORD_INPUT_NAME,
            label: PASSWORD_INPUT_LABEL,
            type: "password",
            valid: validationStatus['passwordInputValid'],
            focused: validationStatus['passwordInputFocused'],
            invalidText: PASSWORD_INVALID_INPUT_MESSAGE,
            showValidationError: validationStatus['passwordInputShowValidationError']
        }
    ]

    const handleSubmit = event => {
        event.preventDefault()
        const credentials = {
            ...values
        }
        login(credentials, navigate, dispatch)
    }

    const onChange = (e) => {
        if (e.target.value.length > INPUT_MAX_LENGTH) return; //!!!
        setValues({ ...values, [e.target.name]: e.target.value });
        const inputWasFocused = validationStatus[e.target.name + INPUT_FOCUSED]
        const inputWasValid = validationStatus[e.target.name + INPUT_VALID]
        validate(e.target.name, e.target.value, dispatch, inputWasFocused, inputWasValid, ON_CHANGE)
    };

    const onBlur = (e) => {
        const inputWasFocused = validationStatus[e.target.name + INPUT_FOCUSED]
        const inputWasValid = validationStatus[e.target.name + INPUT_VALID]
        validate(e.target.name, e.target.value, dispatch, inputWasFocused, inputWasValid, ON_BLUR)
    }

    const formValid = validationStatus.emailInputValid && validationStatus.passwordInputValid

    return (
        <div className={style["login-form-container"]}>
            <form onSubmit={handleSubmit}>
                {inputs.map((input) => (
                    <FormInput {...input} value={values[input.name]} onChange={onChange} onBlur={onBlur} />
                ))}
                <button type="submit" className="btn btn-dark mt-2" disabled={!formValid}>Войти</button>
            </form>
        </div>
    );
}

Form.defaultProps = {
    email: "",
    password: ""
}

export default Form