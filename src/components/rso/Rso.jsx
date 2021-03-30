//https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Basic%20Table&selectedStory=Customized%20id%20and%20class%20table&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
import React, { useState, useEffect } from 'react';
import {NavLink, Redirect, Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootstrap from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Switch from "react-switch";
import { CSVLink } from "react-csv";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const Rso = () => {
    document.title = 'RSO List';

    let localData = localStorage.getItem('is_login');
    localData = JSON.parse(localData);

    const[totalData, setTotalData] = useState([]);
    const[loading, setLoading] = useState(false);
    const[startDate, setStartDate] = useState(new Date());
    const[endDate, setEndDate] = useState(new Date());
    const[checked, setChecked] = useState(true);
    const { SearchBar } = Search;

    const handleChangeStart = date => {
        setStartDate(date);
    }

    const handleChangeEnd = date => {
        setEndDate(date);
    }
    
    const handleChangeSwitch = nextChecked => {
        setChecked(nextChecked);
    };

    // =================================== Default data load ===================================
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
    // =================================== Default data load ===================================

    // =================================== Date conversion  ===================================
    function date_conversion(get_date) {
        var d = new Date(get_date);
        var dt = ('0' + d.getDate()).slice(-2);
        var y = d.getFullYear();
        var m = ('0' + (d.getMonth()+1)).slice(-2);
        return y+'-'+m+'-'+dt;
    }
    // =================================== Date conversion  ===================================

    // =================================== Apply Filter  ===================================
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
    // =================================== Apply Filter  ===================================

    // ================================ Table Property =========================================    
    const showStatus = (cell, row, rowIndex, formatExtraData) => {
        if(row.status) {
            return (
                <>
                    {
                        (row.status) === 'Approved' ?
                        <div className="activeCircle"></div>
                        :
                        <div className="inactiveCircle"></div>
                    }
                </>
            )
        }
    }
    const formatButton = (cell, row, rowIndex, formatExtraData) => {
        if(row.id) {
            return (
                <>
                    <div>
                        <Link className="btn btn-sm btn-success" to={`/rso/edit/${row.id}`}>Edit</Link>
                    </div>
                </>
            )
        }
    }
    const formatSwitch = (cell, row, rowIndex, formatExtraData) => {
        
        if(row.email) {
            return (
                <>
                    <div>
                        {
                            (row.status === 'Approved') ?
                            <Switch height={20} width={40} id={row.email} onChange={handleChangeSwitch} checked={true} className="react-switch" />
                            :
                            <Switch height={20} width={40} id={row.email} onChange={handleChangeSwitch} checked={false} className="react-switch" />
                        }
                    </div>
                </>
            )
        }
    }
    // ================================ Table Property =========================================

    // ================================ Table data load =========================================
    const columns = [
        { dataField: 'username', text: 'Username', sort: true,
        classes: (cell, row, rowIndex, colIndex) => {
            if (rowIndex % 2 === 0) return 'row-even'; return 'row-odd';
        }
        },
        { dataField: 'name', text: 'Name', sort: true },
        { dataField: 'role', text: 'Role', sort: true },
        { dataField: 'email', text: 'Email', sort: true },
        { dataField: 'zone', text: 'Zone', sort: true },
        { dataField: 'city', text: 'City', sort: true },
        { dataField: 'state', text: 'State', sort: true },
        { dataField: 'mobile', text: 'Mobile', sort: true },
        { dataField: 'status', text: 'Status', sort: true, formatter: showStatus },
        { dataField: 'ids', text: 'Change Status', formatter: formatSwitch },
        { dataField: 'id', text: 'Action', formatter: formatButton }
    ]
    useEffect(() => {
        rsoData();
    }, []);
    // ================================ Table data load =========================================

    // =================================== CSV Data ===================================
    const csvResponse = async (data) => {
        let items = { "username": localData.username, "token": localData.token };
        const formData = JSON.stringify(items);
        let result = await fetch("http://localhost/omron_app_api/api/rso-csv-download", {
            method: "POST",
            body: formData
        });
        result = await result.json();
        if(result.status === "2") {
            setcsvData(result.data);
        }
    }
    useEffect(() => {
        csvResponse();
    }, []);

    const[csvData, setcsvData] = useState([]);
    // =================================== CSV Data ===================================

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
                                {/* <Switch height={20} width={40} onChange={handleChangeSwitch} checked={checked} className="react-switch" /> */}
                                    <form action="/" method="post" onSubmit={onSubmit}>
                                        <div className="col-md-3">
                                            <label>Start Date</label>
                                            <div className="input-group date">
                                                <DatePicker selected={startDate} name="start_date" className="form-control datepicker-bg" dateFormat="yyyy-MM-dd" onChange={handleChangeStart.bind(this)} />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <label>End Date</label>
                                            <div className="input-group date">
                                                <DatePicker selected={endDate} name="end_date" className="form-control datepicker-bg" dateFormat="yyyy-MM-dd" onChange={handleChangeEnd} />
                                            </div>
                                        </div>
                                        <div className="col-md-2" style={{marginTop: "24px"}}>
                                            <button type="submit" className="btn btn-primary"><i className="fa fa-filter"></i> Filter</button>
                                        </div>                                 
                                    </form>
                                    <CSVLink className="pull-right btn btn-success" style={{marginTop:"20px"}} data={csvData} filename={"RSO Download.csv"}><i className="fa fa-download"></i> Download</CSVLink>
                                    <br/><br/><br/>

                                    <div className="col-xs-12 table-responsive">

                                    {loading ? (                                        
                                        <ToolkitProvider
                                            keyField="username"
                                            key="id"
                                            data={ totalData }
                                            columns={ columns }
                                            search
                                            >
                                            {
                                                props => (
                                                <div>
                                                    <SearchBar { ...props.searchProps }
                                                    className="input-group"
                                                    style={ { color: 'black' } }
                                                    delay={ 1000 }
                                                    placeholder="Search"
                                                    />
                                                    <hr />
                                                    <BootstrapTable
                                                    { ...props.baseProps }
                                                    pagination={ paginationFactory() }
                                                    hover
                                                    striped
                                                    condensed
                                                    noDataIndication="Table is Empty"
                                                    headerWrapperClasses="foo"
                                                    />
                                                </div>
                                                )
                                            }
                                            </ToolkitProvider>
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