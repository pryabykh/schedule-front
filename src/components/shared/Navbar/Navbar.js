import React from 'react'
import { Link } from "react-router-dom";
import { MAIN_HEADER } from '../../../const/interface';
import { LK_ROUTE, SCHEDULE_ROUTE } from '../../../const/routes';
import MainIcon from '../MainIcon/MainIcon';
import style from "./navbar.module.css"

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark container">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"><MainIcon />{MAIN_HEADER}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to={SCHEDULE_ROUTE} className="nav-link active">Расписание</Link>
                        </li>
                        <li className="nav-item">
                        <Link to={LK_ROUTE} className="nav-link">Отчет</Link>
                        </li>
                        <li className="nav-item">
                        <Link to={LK_ROUTE} className="nav-link">Мои файлы</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Ещё
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;