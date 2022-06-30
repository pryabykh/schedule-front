import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser } from '../store/registrationPageSlice'
import { register } from '../services/UserService'
import { useNavigate } from 'react-router-dom'
import Loader from './shared/Loader'
import { showLoader } from '../store/appSlice'

function Test() {
    const dispatch = useDispatch()
    const count = 0

    const navigate = useNavigate();
    const success = useSelector((state) => state.rootReducer.loginPageReducer.notificationSuccessOpened)
    return (
    <div>
      <Loader />
      <div>
        <button
          aria-label="Increment value"
          onClick={() => register({}, navigate, dispatch)}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(showLoader())}
        >
          Decrement
        </button>
      </div>
    </div>
    );
  }
  
  export default Test;