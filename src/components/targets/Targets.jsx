import React, { useState, useEffect } from 'react';
import {NavLink, Redirect, Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootstrap from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import { CSVLink } from "react-csv";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const Targets = () => {
    document.title = 'Targets List';

    let localData = localStorage.getItem('is_login');
    localData = JSON.parse(localData);

    const[totalData, setTotalData] = useState([]);
    const[loading, setLoading] = useState(false);
    const { SearchBar } = Search;

    // =================================== Default data load ===================================
    const targetsData = async (data) => {
        let items = { "username": localData.username, "token": localData.token };
        const formData = JSON.stringify(items);
        let result = await fetch("http://localhost/omron_app_api/api/targets", {
            method: "POST",
            body: formData
        });
        result = await result.json();
        if(result.status === "2") {
            setTotalData(result.data);
            setLoading(true);
        }
    }
    useEffect(() => {
        targetsData();
    }, []);
    // =================================== Default data load ===================================

    // ================================ Table Property ========================================= 
    const formatButton = (cell, row, rowIndex, formatExtraData) => {
        if(row.id) {
            return (
                <>
                    <div>
                        <Link className="btn btn-sm btn-success" to={`/target/edit/${row.id}`}>Edit</Link>
                    </div>
                </>
            )
        }
    }
    // ================================ Table Property =========================================

    // ================================ Table data load =========================================
    const columns = [
        { dataField: 'rso_code', text: 'RSO Code', sort: true },
        { dataField: 'rso_name', text: 'RSO Name', sort: true },
        { dataField: 'year', text: 'Year', sort: true },
        { dataField: 'month', text: 'Month', sort: true },
        { dataField: 'qt', text: 'Quarter', sort: true },
        { dataField: 'value', text: 'Value', sort: true },
        { dataField: 'id', text: 'Action', formatter: formatButton }
    ]
    // ================================ Table data load =========================================

    // =================================== CSV Data ===================================
    const csvResponse = async (data) => {
        let items = { "username": localData.username, "token": localData.token };
        const formData = JSON.stringify(items);
        let result = await fetch("http://localhost/omron_app_api/api/target-csv-download", {
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
                            <h1>Targets</h1>
                        </section>
                        <section className="content">
                            <div className="box">
                                <div className="box-body">
                                    <CSVLink className="pull-right btn btn-success" data={csvData} filename={"Target Download.csv"}><i className="fa fa-download"></i> Download</CSVLink>
                                    <NavLink className="pull-right btn btn-primary" style={{marginRight:"10px"}} exact to="/upload-targets"><i className="fa fa-upload"></i> Upload Targets </NavLink>
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
export default Targets;