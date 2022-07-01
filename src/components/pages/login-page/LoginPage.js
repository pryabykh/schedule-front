import React from 'react';
import Form from './Form';
import Header from './Header';
import { connect } from 'react-redux'
import AlertSuccess from '../../shared/Alerts/AlertSuccess/AlertSuccess';

function LoginPage({ text }) {
    return (
        <div className="container">
                <div className='row'>
                    <div className='col-12'>
                        <Header />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <AlertSuccess />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <Form />
                    </div>
                </div>
            </div >
    );
}

export default LoginPage;