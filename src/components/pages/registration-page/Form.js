import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../../../services/UserService'
import './Styles.css';

function Form(props) {
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [email, setEmail] = useState(props.email);
    const [password, setPassword] = useState(props.password);

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

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = event => {
        event.preventDefault()
        const user = {
            firstName,
            lastName,
            email,
            password
        }
        register(user, navigate, dispatch)
    }

    return (
        <div className="registration-form-container">
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
                <button onClick={handleSubmit} type="submit" className="btn btn-dark">Войти</button>
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