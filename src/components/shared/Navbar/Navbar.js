import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { FILES_NAV_ITEM, MAIN_HEADER, REPORT_NAV_ITEM, SCHEDULE_NAV_ITEM } from '../../../const/interface';
import { LK_ROUTE, SCHEDULE_ROUTE } from '../../../const/routes';
import { setActiveNavItemKey } from '../../../store/appSlice';
import MainIcon from '../MainIcon/MainIcon';
import style from "./navbar.module.css"

function Navbar() {
    const activeNavItemKey = useSelector((state) => state.rootReducer.appReducer['activeNavItemKey'])
    const dispatch = useDispatch()

    const navItems = [
        {
            key: 1,
            text: SCHEDULE_NAV_ITEM,
            link: SCHEDULE_ROUTE,
        },
        {
            key: 2,
            text: REPORT_NAV_ITEM,
            link: LK_ROUTE,
        },
        {
            key: 3,
            text: FILES_NAV_ITEM,
            link: LK_ROUTE,
        }
    ]

    const onNavClick = (key) => (e) => {
        dispatch(setActiveNavItemKey(key))
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark container">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"><MainIcon />{MAIN_HEADER}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        {navItems.map(({ key, link, text, active }) => (
                            <li key={key} className="nav-item">
                                <Link to={link} onClick={onNavClick(key)} className={`nav-link ${activeNavItemKey === key ? 'active' : ''}`}>{text}</Link>
                            </li>
                        ))}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Ещё
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><Link to="/" onClick={onNavClick(4)} className="dropdown-item">Action</Link></li>
                                <li><Link to="/" onClick={onNavClick(4)} className="dropdown-item">Another action</Link></li>
                                <li><Link to="/" onClick={onNavClick(4)} className="dropdown-item">Something else here</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;