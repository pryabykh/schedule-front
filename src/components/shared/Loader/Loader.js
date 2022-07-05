import React from 'react'
import { useSelector } from 'react-redux'
import style from './loader.module.css'

function Loader() {
  const showLoader = useSelector((state) => state.rootReducer.appReducer.showLoader)

  const loader = (
    <div className={style["loader-background"]}>
      <div className={style["loader-container"]}>
        <div className={style["lds-ripple"]}><div></div><div></div></div>
      </div>
    </div>
  )

  return (
    (showLoader ? loader : <></>)
  );
}

export default Loader;