import React, { useState, useEffect }  from 'react';
import {Redirect} from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2'

const Dashboard = () => {

    document.title = 'Dashboard';

    const [percentage, setpercentage] = useState(1);
    const [rawData, setData] = useState([]);

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

    useEffect(() => {
        setpercentage(80);
    
        setData({
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 29, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        })
    
    }, [setpercentage, setData]);

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
                                            <div className="box-body" style={{height:"100%"}}>
                                                <div className="col-md-12">
                                                    <div id="bpm-inventory"></div>
                                                    <div className="BarExample graph-div" style={{height:"40%", width:"80%"}}>
                                                        <Bar data={rawData} />
                                                        <Pie data={rawData} />
                                                    </div>
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