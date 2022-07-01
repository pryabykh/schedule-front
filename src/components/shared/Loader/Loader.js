import React from 'react'
import { useSelector } from 'react-redux'
import './Style.css'

function Loader() {
  const showLoader = useSelector((state) => state.rootReducer.appReducer.showLoader)

  const loader = (
    <div className='loader-background'>
      <div className='loader-container'>
        <div className="lds-ripple"><div></div><div></div></div>
      </div>
    </div>
  )

  return (
    (showLoader ? loader : <></>)
  );
}

export default Loader;