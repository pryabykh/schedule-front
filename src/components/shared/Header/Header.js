import React from 'react'
import Navbar from '../Navbar/Navbar';
import style from "./header.module.css"

function Header() {
    return (
        <div className={style.header}>
            <Navbar />
        </div>
    );
  }
  
  export default Header;