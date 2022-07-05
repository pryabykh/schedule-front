import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../../services/UserService'
import style from './registration.module.css'
import FormInput from '../../shared/FormInput/FormInput';
import { EMAIL_INPUT_LABEL, EMAIL_INPUT_NAME, EMAIL_INVALID_INPUT_MESSAGE, FIRST_NAME_INPUT_LABEL, FIRST_NAME_INPUT_NAME, FIRST_NAME_INVALID_INPUT_MESSAGE, LAST_NAME_INPUT_LABEL, LAST_NAME_INPUT_NAME, LAST_NAME_INVALID_INPUT_MESSAGE, PASSWORD_INPUT_LABEL, PASSWORD_INPUT_NAME, PASSWORD_INVALID_INPUT_MESSAGE } from '../../../const/interface'
import { validate } from './FormValidation'
import { INPUT_FOCUSED, INPUT_SHOW_VALIDATION_ERROR, INPUT_VALID, ON_BLUR, ON_CHANGE } from '../../../const/validation'
import { INPUT_MAX_LENGTH } from '../../../const/inputs'

function Form() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const validationStatus = {
        firstNameInputValid: useSelector((state) => state.rootReducer.registrationPageReducer[FIRST_NAME_INPUT_NAME + INPUT_VALID]),
        firstNameInputFocused: useSelector((state) => state.rootReducer.registrationPageReducer[FIRST_NAME_INPUT_NAME + INPUT_FOCUSED]),
        firstNameInputShowValidationError: useSelector((state) => state.rootReducer.registrationPageReducer[FIRST_NAME_INPUT_NAME + INPUT_SHOW_VALIDATION_ERROR]),

        lastNameInputValid: useSelector((state) => state.rootReducer.registrationPageReducer[LAST_NAME_INPUT_NAME + INPUT_VALID]),
        lastNameInputFocused: useSelector((state) => state.rootReducer.registrationPageReducer[LAST_NAME_INPUT_NAME + INPUT_FOCUSED]),
        lastNameInputShowValidationError: useSelector((state) => state.rootReducer.registrationPageReducer[LAST_NAME_INPUT_NAME + INPUT_SHOW_VALIDATION_ERROR]),

        emailInputValid: useSelector((state) => state.rootReducer.registrationPageReducer[EMAIL_INPUT_NAME + INPUT_VALID]),
        emailInputFocused: useSelector((state) => state.rootReducer.registrationPageReducer[EMAIL_INPUT_NAME + INPUT_FOCUSED]),
        emailInputShowValidationError: useSelector((state) => state.rootReducer.registrationPageReducer[EMAIL_INPUT_NAME + INPUT_SHOW_VALIDATION_ERROR]),

        passwordInputValid: useSelector((state) => state.rootReducer.registrationPageReducer[PASSWORD_INPUT_NAME + INPUT_VALID]),
        passwordInputFocused: useSelector((state) => state.rootReducer.registrationPageReducer[PASSWORD_INPUT_NAME + INPUT_FOCUSED]),
        passwordInputShowValidationError: useSelector((state) => state.rootReducer.registrationPageReducer[PASSWORD_INPUT_NAME + INPUT_SHOW_VALIDATION_ERROR]),
    }

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const inputs = [
        {
            key: 1,
            id: FIRST_NAME_INPUT_NAME,
            name: FIRST_NAME_INPUT_NAME,
            label: FIRST_NAME_INPUT_LABEL,
            type: "text",
            valid: validationStatus['firstNameInputValid'],
            focused: validationStatus['firstNameInputFocused'],
            invalidText: FIRST_NAME_INVALID_INPUT_MESSAGE,
            showValidationError: validationStatus['firstNameInputShowValidationError']
        },
        {
            key: 2,
            id: LAST_NAME_INPUT_NAME,
            name: LAST_NAME_INPUT_NAME,
            label: LAST_NAME_INPUT_LABEL,
            type: "text",
            valid: validationStatus['lastNameInputValid'],
            focused: validationStatus['lastNameInputFocused'],
            invalidText: LAST_NAME_INVALID_INPUT_MESSAGE,
            showValidationError: validationStatus['lastNameInputShowValidationError']
        },
        {
            key: 3,
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
            key: 4,
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
        const user = {
            ...values
        }
        register(user, navigate, dispatch)
    }

    const onChange = (e) => {
        if(e.target.value.length > INPUT_MAX_LENGTH) return;
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

    const formValid = validationStatus.firstNameInputValid &&
        validationStatus.lastNameInputValid &&
        validationStatus.emailInputValid &&
        validationStatus.passwordInputValid

    return (
        <div className={style["registration-form-container"]}>
            <form onSubmit={handleSubmit}>
                {inputs.map((input) => (
                    <FormInput {...input} value={values[input.name]} onChange={onChange} onBlur={onBlur} />
                ))}
                <button type="submit" className="btn btn-dark mt-2" disabled={!formValid}>Зарегистрироваться</button>
            </form>
        </div>
    );
}

Form.defaultProps = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

export default Form;