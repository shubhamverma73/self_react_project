import React from 'react';
import {NavLink } from 'react-router-dom';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/style.css';
import '../../assets/iCheck/square/green.css';


const Navigation = () => {

    return (    
        <>
            <div>
                <aside class="main-sidebar">
                    <section class="sidebar bg-img" style="#">

                        <div class="user-panel">
                            <div class="pull-left image">
                                <img src="#" class="img-circle" alt="User Image" />
                            </div>
                            <div class="pull-left info">
                                <p class="user_name">Shubham</p>
                                <NavLink className="#" exact to="/"><i class="fa fa-circle text-success"></i> Online</NavLink>
                            </div>
                        </div>

                        <ul class="sidebar-menu">
                            
                            <li class="">
                                <NavLink className="" exact to="/"><i class="fa fa-dashboard"></i> <span> Dashboard</span></NavLink>
                            </li>

                            <li class="">
                                <NavLink className="" exact to="/"><i class="fa fa-dashboard"></i> <span> Dashboard</span></NavLink>
                            </li>

                            <li class="">
                                <NavLink className="" exact to="/"><i class="fa fa-dashboard"></i> <span> Dashboard</span></NavLink>
                            </li>

                            <li class="">
                                <NavLink className="" exact to="/"><i class="fa fa-users"></i> <span> Admin List</span></NavLink>
                            </li>

                            <li class="">
                                <NavLink className="" exact to="/"><i class="fa fa-users"></i> <span> Add RSO</span></NavLink>
                            </li>
                            
                            <li class="">
                                <NavLink className="" exact to="/"><i class="fa fa-ticket"></i> <span> RSO Ticket</span></NavLink>
                            </li>

                            <li class="">
                                <NavLink className="" exact to="/"><i class="fa fa-users"></i> <span> Add ASM</span></NavLink>
                            </li>

                            <li class="treeview">
                                <NavLink className=""><i class="fa fa-file"></i><span class="pull-right-container">
                                <i class="fa fa-angle-left pull-right"></i></span>RSO Reports
                            </NavLink>
                            <ul class="treeview-menu" style="display: none;">
                                <li class="">
                                    <NavLink className="" exact to="/"><i class="fa fa-home" aria-hidden="true"></i> <span> Store Order Report</span></NavLink>
                                </li>
                            </ul>
                            </li>
                            
                        </ul>
                    </section>
                </aside>
            </div>
        </>
    );
}

export default Navigation;