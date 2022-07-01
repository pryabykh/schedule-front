import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../../services/AuthService'
import './Styles.css'

function Form(props) {
    const [email, setEmail] = useState(props.email);
    const [password, setPassword] = useState(props.password);

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
        const credentials = {
            email,
            password
        }
        login(credentials, navigate, dispatch)
    }

    return (
        <div className="login-form-container">
        <form>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input value={email} onChange={handleEmailChange} type="email" className="form-control" id="email" name="email" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Пароль</label>
                <input value={password} onChange={handlePasswordChange} type="password" className="form-control" id="password" name="password" />
            </div>
            <button onClick={handleSubmit} type="submit" className="btn btn-dark">Войти</button>
        </form>
    </div> 
    );
  }

Form.defaultProps = {
    email: "",
    password: ""
}

export default Form