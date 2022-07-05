import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../../services/AuthService'
import style from './login.module.css'
import FormInput from '../../shared/FormInput/FormInput'
import { EMAIL_INPUT_LABEL, EMAIL_INPUT_NAME, PASSWORD_INPUT_LABEL, PASSWORD_INPUT_NAME } from '../../../const/interface'

function Form() {
    const [values, setValues] = useState({
        email: "",
        password: ""
      });

    const inputs = [
        {
            key: 1,
            id: EMAIL_INPUT_NAME,
            name: EMAIL_INPUT_NAME,
            label: EMAIL_INPUT_LABEL,
            type: "email",
        },
        {
            key: 2,
            id: PASSWORD_INPUT_NAME,
            name: PASSWORD_INPUT_NAME,
            label: PASSWORD_INPUT_LABEL,
            type: "password",
        }
    ]
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = event => {
        event.preventDefault()
        const credentials = {
            ...values
        }
        login(credentials, navigate, dispatch)
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };

    return (
        <div className={style["login-form-container"]}>
        <form onSubmit={handleSubmit}>
        {inputs.map((input) => (
                    <FormInput {...input} value={values[input.name]} onChange={onChange} />
                ))}
            <button type="submit" className="btn btn-dark">Войти</button>
        </form>
    </div> 
    );
  }

Form.defaultProps = {
    email: "",
    password: ""
}

export default Form