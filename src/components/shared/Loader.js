import React from 'react'
import { useSelector } from 'react-redux'

function Loader() {
    const showLoader = useSelector((state) => state.rootReducer.appReducer.showLoader)

  return (
    (showLoader ? <div>Загрузка...</div> : <></>)
  );
}

export default Loader;