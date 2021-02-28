import React, { useState, useEffect }  from 'react';
import {Redirect} from 'react-router-dom';

const Dashboard = () => {

    document.title = 'Dashboard';

    let localData = localStorage.getItem('is_login');
    localData = JSON.parse(localData);

    const[totalData , setTotalData] = useState([]);

    const logoutData = async () => {
        let items = { "username": localData.username, "token": localData.token };
        const formData = JSON.stringify(items);
        let result = await fetch("http://localhost/omron_app_api/api/dashboard", {
            method: "POST",
            body: formData
        });
        result = await result.json();
        if(result.status === "2") {
            setTotalData(result.data);
        }
    }

    useEffect(() => {
        logoutData();
    }, []);

    return (
        <>
            {
                !localStorage.getItem('is_login') ? <Redirect to='/' /> :
                <div>
                    <div className="content-wrapper"  style={{paddingTop: "80px"}}>        
                        <section className="content">	 
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="box box-primary">
                                        <div className="row">
                                            <div className="box-body">
                                                <div className="col-lg-3 col-xs-6">
                                                    <a href={process.env.PUBLIC_URL}>
                                                    <div className="small-box bg-purple">
                                                        <div className="inner"><h3>{totalData.ads}</h3><p>Total AD</p></div>
                                                        <div className="icon"><i className="fa  fa-user"></i></div>
                                                    </div>
                                                    </a>
                                                </div>

                                                <div className="col-lg-3 col-xs-6">
                                                    <a href={process.env.PUBLIC_URL}>
                                                    <div className="small-box bg-olive">
                                                        <div className="inner"><h3>{totalData.distributors}</h3><p>Total Distributor</p></div>
                                                        <div className="icon"><i className="fa  fa-user"></i></div>
                                                    </div>
                                                    </a>
                                                </div>
                                            
                                                <div className="col-lg-3 col-xs-6">
                                                    <a href={process.env.PUBLIC_URL}>
                                                    <div className="small-box bg-blue">
                                                        <div className="inner"><h3>{totalData.retailers}</h3><p>Total Retailers</p></div>
                                                        <div className="icon"><i className="fa  fa-user"></i></div>
                                                    </div>
                                                    </a>
                                                </div>
                                            
                                                <div className="col-lg-3 col-xs-6">
                                                    <a href={process.env.PUBLIC_URL}>
                                                    <div className="small-box bg-maroon">
                                                        <div className="inner"><h3>{totalData.rso}</h3><p>Total RSO</p></div>
                                                        <div className="icon"><i className="fa  fa-user"></i></div>
                                                    </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="clearfix"></div>
                                        <hr />

                                        <div className="box-body">
                                            <div className="col-md-12 box-alignment">
                                                <div className="row">
                                                    <span>All India BPM and Nebulizer Inventory(MTD)</span>
                                                </div>							
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="box-body">
                                                <div className="col-md-12">
                                                    <div id="bpm-inventory"></div>
                                                    <p className="amount-val"><strong>K =</strong> Thoudands, <strong>M =</strong> Million, <strong>B =</strong> Billion</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="box-body">
                                                <div className="col-md-12">
                                                    <div id="nebu-inventory"></div>
                                                    <p className="amount-val"><strong>K =</strong> Thoudands, <strong>M =</strong> Million, <strong>B =</strong> Billion</p>
                                                </div>
                                            </div>
                                        </div>					
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            }
        </>
    );
}

export default Dashboard;