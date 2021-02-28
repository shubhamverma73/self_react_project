import React from 'react';
import {NavLink } from 'react-router-dom';
import icon from '../../assets/img/logosmall.png';


const Header = (props) => {
    return (
        <>
            {
				(props.value === '') ? '' :
                <header className="main-header">
                    <a href="http://triad01.com/" className="logo">
                        <span className="logo-mini bg-white"><img src={icon} alt="Logo" /></span>
                        <span className="logo-lg"><img height="35px" src={icon} alt="Icon" width="155px" /></span>
                    </a>
                    <nav className="navbar navbar-static-top">
                        <a href="void(0)" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                            <span className="sr-only">Toggle navigation</span>
                        </a>

                        <div className="navbar-custom-menu">
                            <ul className="nav navbar-nav">
                                <li className="dropdown user user-menu">
                                    <NavLink className="nav-link" exact to="/logout"> <i className="fa fa-cogs"></i> Logout </NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
            }
        </>
    );
}

export default Header;