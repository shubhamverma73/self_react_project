import React, { useState, useEffect } from 'react';
import {NavLink, Redirect } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootstrap from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Rso = () => {

    document.title = 'RSO List';

    let localData = localStorage.getItem('is_login');
    localData = JSON.parse(localData);

    const[totalData , setTotalData] = useState([]);
    const[loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleChangeStart = date => {
        setStartDate(date);
    }

    const handleChangeEnd = date => {
        setEndDate(date);
    }

    const rsoData = async (data) => {
        let items = { "username": localData.username, "token": localData.token,
        "start_date": '', "end_date": '' };
        const formData = JSON.stringify(items);
        let result = await fetch("http://localhost/omron_app_api/api/rso_list", {
            method: "POST",
            body: formData
        });
        result = await result.json();
        if(result.status === "2") {
            setTotalData(result.data);
            setLoading(true);
        }
    }

    function date_conversion(get_date) {
        var d = new Date(get_date);
        var dt = ('0' + d.getDate()).slice(-2);
        var y = d.getFullYear();
        var m = ('0' + (d.getMonth()+1)).slice(-2);
        return y+'-'+m+'-'+dt;
      }

    const onSubmit = async (event) => {
        event.preventDefault();
        let items = { "username": localData.username, "token": localData.token,
                    "start_date": date_conversion(startDate), "end_date": date_conversion(endDate) };
        const formData = JSON.stringify(items);
        let result = await fetch("http://localhost/omron_app_api/api/rso_list", {
            method: "POST",
            body: formData
        });
        result = await result.json();
        if(result.status === "2") {
            setTotalData(result.data);
            setLoading(true);
        }
    };

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
        rsoData();
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
                            
                                    <form action="/" method="post" onSubmit={onSubmit}>
                                        <div className="col-md-3">
                                            <label>Start Date</label>
                                            <div className="input-group date">
                                                <DatePicker selected={startDate} name="start_date" className="form-control datepicker-bg" dateFormat="yyyy-MM-dd" onChange={handleChangeStart} />
                                                <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <label>End Date</label>
                                            <div className="input-group date">
                                                <DatePicker selected={endDate} name="end_date" className="form-control datepicker-bg" dateFormat="yyyy-MM-dd" onChange={handleChangeEnd} />
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