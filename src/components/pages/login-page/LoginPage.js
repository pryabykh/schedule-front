import React from 'react';
import Form from './Form';
import Header from './Header';
import { connect } from 'react-redux'
import AlertSuccess from './AlertSuccess';

class LoginPage extends React.Component {
    alertSuccess = this.props.notificationSuccessOpened && (<AlertSuccess text={this.props.notificationSuccessText} />)


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
                        {this.alertSuccess}
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

const mapStateToProps = state => ({
    notificationSuccessText: state.rootReducer.loginPageReducer.notificationSuccessText,
    notificationSuccessOpened: state.rootReducer.loginPageReducer.notificationSuccessOpened
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)