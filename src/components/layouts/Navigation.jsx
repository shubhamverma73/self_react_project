import React, {useContext} from 'react';
import {NavLink } from 'react-router-dom';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/style.css';
import '../../assets/css/skin-purple.css';
import '../../assets/css/skin-blue.css';
import '../../assets/css/skin-green.css';
import '../../assets/iCheck/square/green.css';
import icon from '../../assets/img/admin.png';
import bg from '../../assets/img/bg.jpg';
import { localStorageData } from "./Protected";

const Navigation = () => {
    const localData = useContext(localStorageData);
    let urlElements = window.location.href.split('/');
    let activeURL = urlElements[3];

    return (    
        <>
            <div>
                <aside className="main-sidebar">
                    <section className="sidebar bg-img" style={{backgroundImage: `url(${bg})`}}>

                        <div className="user-panel">
                            <div className="pull-left image">
                                <img src={icon} className="img-circle" alt="logged in user icon" />
                            </div>
                            <div className="pull-left info">
                                <p className="user_name">{localData.name}</p>
                                <NavLink className="nav-link" exact to="/"><i className="fa fa-circle text-success"></i> Online </NavLink>
                            </div>
                        </div>

                        <ul className="sidebar-menu">
                            <li className="">
                                <NavLink className="nav-link"  activeClassName={(activeURL === 'dashboard') ? 'active' : '' } exact to="/dashboard"><i className="fa fa-home"></i> Dashboard </NavLink>
                            </li>
                            <li className="">
                                <NavLink className="nav-link"  activeClassName={(activeURL === 'rso') ? 'active' : '' } exact to="/rso"><i className="fa fa-users"></i> Add RSO </NavLink>
                            </li>
                            <li className="">
                                <NavLink className="nav-link"  activeClassName={(activeURL === 'ticket') ? 'active' : '' } exact to="/ticket"><i className="fa fa-ticket"></i> RSO Ticket </NavLink>
                            </li>
                            
                        </ul>
                    </section>
                </aside>
            </div>
        </>
    );
}

export default Navigation;