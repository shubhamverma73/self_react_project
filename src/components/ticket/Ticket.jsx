import React, { useState, useEffect } from 'react';
import {Redirect, Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootstrap from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CSVLink } from "react-csv";

const Ticket = () => {
    document.title = 'Ticket List';

    let localData = localStorage.getItem('is_login');
    localData = JSON.parse(localData);

    const[totalData, setTotalData] = useState([]);
    const[loading, setLoading] = useState(false);
    const[startDate, setStartDate] = useState(new Date());
    const[endDate, setEndDate] = useState(new Date());
    const[searchArray, setsearchArray] = useState([]);
    const[ticketStatus, setticketStatus] = useState([]);

    const handleChangeStart = date => {
        setStartDate(date);
    }

    const handleChangeEnd = date => {
        setEndDate(date);
    }

    // =================================== Total ticket count ===================================
    const ticketCountsData = async (data) => {
        let items = { "username": localData.username, "token": localData.token };
        const formData = JSON.stringify(items);
        let result = await fetch("http://localhost/omron_app_api/api/ticket_count", {
            method: "POST",
            body: formData
        });
        result = await result.json();
        if(result.status === "2") {
            setticketStatus(result.data);
        }
    }
    useEffect(() => {
        ticketCountsData();
    }, []);
    // =================================== Total ticket count ===================================

    // =================================== Default data load ===================================
    const ticketData = async (data) => {
        let items = { "username": localData.username, "token": localData.token,
        "start_date": '', "end_date": '' };
        const formData = JSON.stringify(items);
        let result = await fetch("http://localhost/omron_app_api/api/tickets", {
            method: "POST",
            body: formData
        });
        result = await result.json();
        if(result.status === "2") {
            setTotalData(result.data);
            setsearchArray(result.data);
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
        let result = await fetch("http://localhost/omron_app_api/api/tickets", {
            method: "POST",
            body: formData
        });
        result = await result.json();
        if(result.status === "2") {
            setTotalData(result.data);
            setsearchArray(result.data);
            setLoading(true);
        }
    };
    useEffect(() => {
        ticketData();
    }, []);
    // =================================== Apply Filter  ===================================

    // ================================ Table Property =========================================    
    const showStatus = (cell, row, rowIndex, formatExtraData) => {
        if(row.status) {
            return (
                <>
                    {(() => {
                        switch (row.status) {
                        case 'Pending':
                            return (<div>
                                        <button className="btn btn-warning">Pending</button>
                                    </div>);
                        case 'Closed':
                            return (<div>
                                        <button className="btn btn-success">Closed</button>
                                    </div>);
                        case 'Reject':
                            return (<div>
                                        <button className="btn btn-danger">Rejected</button>
                                    </div>);
                        default:
                            return null;
                        }
                    })()}
                </>
            )
        }
    }
    const formatButton = (cell, row, rowIndex, formatExtraData) => {
        if(row.id) {
            return (
                <>
                    <div>
                        <Link className="btn btn-sm btn-success" to={`/ticket/edit/${row.id}`}>Edit</Link>
                    </div>
                </>
            )
        }
    }
    const shortDesc = (cell, row, rowIndex, formatExtraData) => {
        if(row.description) {
            return (
                <>
                    <div>
                        {row.description.slice(0, 10)+' ...'}
                    </div>
                </>
            )
        }
    }
    // ================================ Table Property =========================================

    // ================================ Table data load =========================================
    const columns = [
        { dataField: 'ticket_id', text: 'Ticket ID', sort: true },
        { dataField: 'store_id', text: 'Store ID', sort: true },
        { dataField: 'store_name', text: 'Store Name', sort: true },
        { dataField: 'rso_code', text: 'RSO Code', sort: true },
        { dataField: 'user_type', text: 'User', sort: true },
        { dataField: 'ticket_related', text: 'TIcket Related', sort: true },
        { dataField: 'description', text: 'Description', sort: true, formatter: shortDesc },
        { dataField: 'date', text: 'Date', sort: true },
        { dataField: 'status', text: 'Status', sort: true, formatter: showStatus },
        { dataField: 'id', text: 'Action', formatter: formatButton }
    ]
    // ================================ Table data load =========================================

    // =================================== Filter ===================================
    const onChangeHandler = (event) => {
        let newArray = searchArray.filter((d) => 
        {
            var searchValue = d.ticket_id.toLowerCase();
            return searchValue.indexOf(event.target.value) !== -1;
        });
        setTotalData(newArray);
    };
    // =================================== Filter ===================================

    // =================================== CSV Data ===================================
    const csvResponse = async (data) => {
        let items = { "username": localData.username, "token": localData.token };
        const formData = JSON.stringify(items);
        let result = await fetch("http://localhost/omron_app_api/api/ticket-csv-download", {
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
                            <h1>Tickets</h1>
                        </section>

                        <section className="content">

                        <div className="row">
                            {                         
                                ticketStatus.map(tktStatus => {                
                                return   (<div className="col-md-3" key={tktStatus.total_ticket}>
                                        <div className="info-box">
                                            {
                                                (() => {
                                                switch (tktStatus.status) {
                                                case 'Total':
                                                    return (<span className="info-box-icon bg-aqua"><i className="fa fa-ticket"></i></span>);
                                                case 'Pending':
                                                    return (<span className="info-box-icon bg-yellow"><i className="fa fa-ticket"></i></span>);
                                                case 'Closed':
                                                    return (<span className="info-box-icon bg-green"><i className="fa fa-ticket"></i></span>);
                                                case 'Reject':
                                                    return (<span className="info-box-icon bg-red"><i className="fa fa-ticket"></i></span>);
                                                default:
                                                    return null;
                                                }
                                                })()
                                            }
                                            <div className="info-box-content">
                                                <span className="info-box-text">{tktStatus.status}</span>
                                                <span className="info-box-number">{tktStatus.total_ticket}</span>
                                            </div>
                                        </div>
                                    </div>)
                                })
                            }
                        </div>
                            <div className="box">
                                <div className="box-body">
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
                                    <CSVLink className="pull-right btn btn-success" style={{marginTop:"20px"}} data={csvData} filename={"TIcket Download.csv"}><i className="fa fa-download"></i> Download</CSVLink>
                                    <br/><br/><br/>

                                    <div className="input-group pull-right">
                                        <div className="form-outline">
                                            <input type="search" className="form-control" name="search" id="search" placeholder="Search" onChange={onChangeHandler} />
                                        </div>
                                    </div>
                                    <br/><br/>

                                    <div className="col-xs-12 table-responsive">

                                    {loading ? (                                        
                                        <BootstrapTable
                                            keyField="username"
                                            key="id"
                                            data={ totalData }
                                            columns={ columns }
                                            pagination={ paginationFactory() }
                                            hover
                                            striped
                                            condensed
                                            noDataIndication="Table is Empty"
                                            headerWrapperClasses="foo"
                                        >
                                        </BootstrapTable>
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
export default Ticket;