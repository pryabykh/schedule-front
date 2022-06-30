import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser } from '../store/registrationPageSlice'

function Test() {
    const dispatch = useDispatch()
    const count = 0

    return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(registerUser(3))}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(registerUser(3))}
        >
          Decrement
        </button>
      </div>
    </div>
    );
  }
  
  export default Test;