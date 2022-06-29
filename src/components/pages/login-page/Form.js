import React from 'react';
import './Styles.css';

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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

    render() {
        return (
            <div className="login-form-container">
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input value={this.state.email} onChange={this.handleChange} type="email" className="form-control" id="email" name="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Пароль</label>
                        <input value={this.state.password} onChange={this.handleChange} type="password" className="form-control" id="password" name="password" />
                    </div>
                    <button type="submit" className="btn btn-dark">Войти</button>
                </form>
            </div>
        );
    }
}

Form.defaultProps = {
    email: "",
    password: ""
}

export default Form