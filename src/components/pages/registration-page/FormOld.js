import React from 'react';
import './Styles.css';
import {register} from '../../../store/appSlice';
import {showNotificationSuccessLoginPage} from '../../../store/loginPageSlice';
import {registerUser} from '../../../store/registrationPageSlice';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            email: this.props.email,
            password: this.props.password
        }
    }

    handleChange = event => {
        event.persist()
        this.setState(prev => ({
            ...prev, ...{
                [event.target.name]: event.target.value
            }
        }))
    }

    handleSubmit = event => {
        this.props.register()
        this.props.registerUser(3);
        this.props.showNotificationSuccessLoginPage("Регистрация прошла успешно, Вы можете войти в личный кабинет.")
    }

    render() {
        return (
            <div className="mt-5 registration-form-container">
                <form>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">Имя</label>
                        <input value={this.state.firstName} onChange={this.handleChange} type="text" className="form-control" id="firstName" name="firstName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Фамилия</label>
                        <input value={this.state.lastName} onChange={this.handleChange} type="lastName" className="form-control" id="lastName" name="lastName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input value={this.state.email} onChange={this.handleChange} type="email" className="form-control" id="email" name="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Пароль</label>
                        <input value={this.state.password} onChange={this.handleChange} type="password" className="form-control" id="password" name="password" aria-describedby="passwordHelp" />
                        <div id="passwordHelp" className="form-text">Пароль должен содержать минимум 6 символов.</div>
                    </div>
                    {/* <Link to="/login" onClick={this.handleSubmit} className="btn btn-dark">Зарегистрироваться</Link> */}
                    <button onClick={this.handleSubmit} type="submit" className="btn btn-dark">Зарегистрироваться</button>
                </form>
            </div>
        );
    }
}

Form.defaultProps = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

const mapStateToProps = state => ({
    notificationText: state.rootReducer.loginPageReducer.notificationSuccessText
})

const mapDispatchToProps = {
    register, showNotificationSuccessLoginPage, registerUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)