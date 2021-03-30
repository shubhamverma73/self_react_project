import React, { useState, useEffect } from 'react';
import {Redirect, Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootstrap from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CSVLink } from "react-csv";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const Stores = () => {
    document.title = 'Stores List';

    let localData = localStorage.getItem('is_login');
    localData = JSON.parse(localData);

    const[totalData, setTotalData] = useState([]);
    const[loading, setLoading] = useState(false);
    const[startDate, setStartDate] = useState(new Date());
    const[endDate, setEndDate] = useState(new Date());
    const[searchArray, setsearchArray] = useState([]);
    const { SearchBar } = Search;

    const handleChangeStart = date => {
        setStartDate(date);
    }

    const handleChangeEnd = date => {
        setEndDate(date);
    }

    // =================================== Default data load ===================================
    const storesData = async (data) => {
        let items = { "username": localData.username, "token": localData.token,
        "start_date": '', "end_date": '' };
        const formData = JSON.stringify(items);
        let result = await fetch("http://localhost/omron_app_api/api/stores", {
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
        let result = await fetch("http://localhost/omron_app_api/api/stores", {
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
        storesData();
    }, []);
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
                        <Link className="btn btn-sm btn-success" to={`/store/edit/${row.id}`}>Edit</Link>
                    </div>
                </>
            )
        }
    }
    const showImage = (cell, row, rowIndex, formatExtraData) => {
        if(row.image) {
            return (
                <>
                    <div>
                        <a href={row.image} target="_blank"><img src={row.image} width="40" height="40" /></a>
                    </div>
                </>
            )
        }
    }
    // ================================ Table Property =========================================

    // ================================ Table data load =========================================
    const columns = [
        { dataField: 'retailer_code', text: 'Store ID', sort: true },
        { dataField: 'retailer_name', text: 'Store Name', sort: true },
        { dataField: 'email', text: 'Email', sort: true },
        { dataField: 'mobile', text: 'Mobile', sort: true },
        { dataField: 'rso_code', text: 'RSO Code', sort: true },
        { dataField: 'rso_name', text: 'RSO Name', sort: true },
        { dataField: 'asm_code', text: 'ASM Code', sort: true },
        { dataField: 'asm_name', text: 'ASM Name', sort: true },
        { dataField: 'zone', text: 'Zone', sort: true },
        { dataField: 'state', text: 'State', sort: true },
        { dataField: 'city', text: 'City', sort: true },
        { dataField: 'address', text: 'Address', sort: true },
        { dataField: 'pincode', text: 'Pincode', sort: true },
        { dataField: 'lat', text: 'Lattitude', sort: true },
        { dataField: 'long', text: 'Longitude', sort: true },
        { dataField: 'image', text: 'Imaage', sort: true, formatter: showImage },
        { dataField: 'status', text: 'Status', sort: true, formatter: showStatus },
        { dataField: 'id', text: 'Action', formatter: formatButton }
    ]
    // ================================ Table data load =========================================

    // =================================== CSV Data ===================================
    const csvResponse = async (data) => {
        let items = { "username": localData.username, "token": localData.token };
        const formData = JSON.stringify(items);
        let result = await fetch("http://localhost/omron_app_api/api/store-csv-download", {
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
                            <h1>Storess</h1>
                        </section>
                        <section className="content">
                            <div className="box">
                                <div className="box-body">
                                    <form action="/" method="post" onSubmit={onSubmit}>
                                        <div className="col-md-3">
                                            <label>Start Date</label>
                                            <div className="input-group">
                                                <DatePicker selected={startDate} name="start_date" className="form-control datepicker-bg" dateFormat="yyyy-MM-dd" showMonthDropdown showYearDropdown dropdownMode="select" onChange={handleChangeStart.bind(this)} />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <label>End Date</label>
                                            <div className="input-group date">
                                                <DatePicker selected={endDate} name="end_date" className="form-control datepicker-bg" dateFormat="yyyy-MM-dd" showMonthDropdown showYearDropdown dropdownMode="select" onChange={handleChangeEnd} />
                                            </div>
                                        </div>
                                        <div className="col-md-2" style={{marginTop: "24px"}}>
                                            <button type="submit" className="btn btn-primary"><i className="fa fa-filter"></i> Filter</button>
                                        </div>                                 
                                    </form>
                                    <CSVLink className="pull-right btn btn-success" style={{marginTop:"20px"}} data={csvData} filename={"Store Download.csv"}><i className="fa fa-download"></i> Download</CSVLink>
                                    <br/><br/><br/>

                                    <div className="col-xs-12 table-responsive">

                                    {loading ? (                                        
                                        <ToolkitProvider
                                            keyField="id"
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
export default Stores;