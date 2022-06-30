import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser } from '../../../store/registrationPageSlice'
import {showNotificationSuccessLoginPage} from '../../../store/loginPageSlice'

function Form(props) {
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [email, setEmail] = useState(props.email);
    const [password, setPassword] = useState(props.password);

    const dispatch = useDispatch()

    const handleFirstNameChange = event => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = event => {
        setLastName(event.target.value);
    }

    const handleEmailChange = event => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    }

    const handleSubmit = event => {
        const user = {
            firstName,
            lastName,
            email,
            password
        }
        dispatch(registerUser(user))
        dispatch(showNotificationSuccessLoginPage("Регистрация прошла успешно, Вы можете войти в личный кабинет."))
    }

    return (
        <div className="mt-5 registration-form-container">
        <form>
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">Имя</label>
                <input value={firstName} onChange={handleFirstNameChange} type="text" className="form-control" id="firstName" name="firstName" />
            </div>
            <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Фамилия</label>
                <input value={lastName} onChange={handleLastNameChange} type="lastName" className="form-control" id="lastName" name="lastName" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input value={email} onChange={handleEmailChange} type="email" className="form-control" id="email" name="email" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Пароль</label>
                <input value={password} onChange={handlePasswordChange} type="password" className="form-control" id="password" name="password" aria-describedby="passwordHelp" />
                <div id="passwordHelp" className="form-text">Пароль должен содержать минимум 6 символов.</div>
            </div>
            <Link to="/login" onClick={handleSubmit} className="btn btn-dark">Зарегистрироваться</Link>
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