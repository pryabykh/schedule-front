import React from 'react';
import Form from './Form';
import Header from './Header';

class RegistrationPage extends React.Component {
    render() {
        return (
            <div className="container">
                <div className='row'>
                    <div className='col-12'>
                        <Header />
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
}

export default RegistrationPage;