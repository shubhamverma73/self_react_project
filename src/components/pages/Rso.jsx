import React, { useState, useEffect } from 'react';
import {NavLink, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootstrap from 'react-bootstrap';

const Rso = () => {

    document.title = 'RSO List';
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        
    };

    let localData = localStorage.getItem('is_login');
    localData = JSON.parse(localData);

    const[totalData , setTotalData] = useState([]);
    const[loading, setLoading] = useState(false);

    const logoutData = async () => {
        let items = { "username": localData.username, "token": localData.token };
        const formData = JSON.stringify(items);
        let result = await fetch("http://localhost/omron_app_api/api/retailer_list", {
            method: "POST",
            body: formData
        });
        result = await result.json();
        if(result.status === "2") {
            setTotalData(result.data);
            setLoading(true);
        }
    }

    const columns = [
        { dataField: 'username', text: 'Username' },
        { dataField: 'name', text: 'Name' },
        { dataField: 'role', text: 'Role' },
        { dataField: 'email', text: 'Email' },
        { dataField: 'zone', text: 'Zone' },
        { dataField: 'address', text: 'Addess' },
        { dataField: 'city', text: 'City' },
        { dataField: 'state', text: 'State' },
        { dataField: 'mobile', text: 'Mobile' },
        { dataField: 'status', text: 'Status' }
    ];

    useEffect(() => {
        logoutData();
    }, []);

    return (
        <>
            {
                !localStorage.getItem('is_login') ? <Redirect to='/' /> :
                <div>
                    <div className="content-wrapper"  style={{paddingTop: "10px"}}>        
                        <section className="content-header">
                            <NavLink className="pull-right btn btn-success" style={{marginRight:"10px"}} exact to="/add-rso"><i className="fa fa-plus"></i> Add RSO </NavLink>
                            <h1>RSO List</h1>
                        </section>

                        <section className="content">
                            <div className="box">
                                <div className="box-body">
                            
                                    <form action="/" method="post" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="col-md-3">
                                            <label>Start Date</label>
                                            <div className="input-group date">
                                                <input type="text" name="start" readOnly className="form-control" ref={register()} />
                                                <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <label>End Date</label>
                                            <div className="input-group date">
                                                <input type="text" name="end" readOnly className="form-control" ref={register()} />
                                                <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                                            </div>
                                        </div>
                                        <div className="col-md-2" style={{marginTop: "24px"}}>
                                            <button type="submit" className="btn btn-primary"><i className="fa fa-filter"></i> Filter</button>
                                        </div>                                        
                                    </form>
                                    <NavLink className="pull-right btn btn-success" style={{marginTop:"20px"}} exact to="/download-rso"><i className="fa fa-download"></i> Download </NavLink>
                                    <br/><br/><br/><br/>

                                    <div className="col-xs-12 table-responsive">

                                    {loading ? (
                                        <BootstrapTable
                                            keyField="username"
                                            data={ totalData }
                                            columns={ columns }
                                            pagination={ paginationFactory() }
                                        />
                                    ) : <ReactBootstrap.Spinner animation="border" />
                                    }
                                        
                                    </div>

                                </div>
                            </div>		
                        </section>
                        
                    </div>
                </div>
            }
        </>
    );

};
export default Rso;