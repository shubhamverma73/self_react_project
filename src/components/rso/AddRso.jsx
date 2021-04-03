import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {NavLink, Redirect, useHistory } from 'react-router-dom';

const AddUser = () => {

    document.title = 'Add RSO';
    let localData = localStorage.getItem('is_login');
    localData = JSON.parse(localData);

    let history = useHistory();
    const { register, handleSubmit } = useForm([]);
    const[showMessage, setshowMessage] = useState('hide');
    const[messageType, setmessageType] = useState('success');
    const[message, setMessage] = useState();
    const[zones, setZones] = useState([]);
    const[states, setStates] = useState([]);
    const[cities, setCities] = useState([]);

    const zone = async () => {
        let items = { "username": localData.username, "token": localData.token };
        const formData = JSON.stringify(items);
        let result = await fetch("http://localhost/omron_app_api/api/zone-list", {
            method: "POST",
            body: formData
        });
        result = await result.json();
        if(result.status === "2") {
            setZones(result.data);
        }
    }
    useEffect(() => {
        zone();
    }, []);
    
    const zoneChange = async(event) => {
        let items = { "zone": event.target.value };
        const formData = JSON.stringify(items);
        let result = await fetch("http://localhost/omron_app_api/api/state-list", {
            method: "POST",
            body: formData
        });
        result = await result.json();
        if(result.status === "2") {
            setStates(result.data);
        }
    }

    const stateChange = async(event) => {
        let items = { "state": event.target.value };
        const formData = JSON.stringify(items);
        let result = await fetch("http://localhost/omron_app_api/api/city-list", {
            method: "POST",
            body: formData
        });
        result = await result.json();
        if(result.status === "2") {
            setCities(result.data);
        }
    }

    const onSubmit = async (data) => {
        let items = {...data};
        const formData = JSON.stringify(items);
        let result = await fetch("http://localhost/omron_app_api/api/add_rso", {
            method: "POST",
            body: formData
        });
        result = await result.json();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        
        if(result.status === "2") {
            setshowMessage('');
            setmessageType('success');
            setMessage(result.message);
            setTimeout( () => {
                history.push('/rso');
            }, 5000);
        } else {
            setshowMessage('');
            setmessageType('danger');
            setMessage(result.message);
        }
    }

    return (
        <>
            {
                !localStorage.getItem('is_login') ? <Redirect to='/' /> :
                <div>
                    <div className="content-wrapper"  style={{paddingTop: "10px"}}>        
                        <section className="content-header">
                            <NavLink className="pull-right btn btn-success" style={{marginRight:"10px"}} exact to="/rso"><i className="fa fa-plus"></i> RSO's List </NavLink>
                            <h1>Edit RSO</h1>
                        </section>
                        <section className="content">
                            <div className="box">
                                <div className="box-body">
                                {
                                    (showMessage !== 'hide') ? 
                                    <div className={`alert alert-${messageType} ${showMessage}`} role="alert">
                                        {message}
                                    </div>
                                    : ''
                                }                            
                                <form action="/" method="post" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row">
                                        <div className="form-group col-sm-4">
                                            <label>Username <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="username" name="username" ref={register} />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Email <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="email" name="email" ref={register} />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Password <span className="red">*</span></label>
                                            <input type="password" className="form-control" id="password" name="password" ref={register} />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Name <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="name" name="name" ref={register} />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Role<span className="red">*</span></label>
                                            <input type="text" className="form-control" id="role" name="role" ref={register} />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Mobile <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="mobile" name="mobile" ref={register} />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Zone <span className="red">*</span></label>
                                            <select name="zone" id="zone" onChange={zoneChange} className="form-control chosen-select" ref={register} >
                                                <option value="">Select State</option>
                                                {zones.map(region =>
                                                    <option key={region.region} value={region.region}>{region.region}</option>
                                                )};
                                            </select>
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>State <span className="red">*</span></label>
                                            <select name="state" id="state" onChange={stateChange} className="form-control chosen-select" ref={register} >
                                                {states.map(getState =>
                                                    <option key={getState.statename} value={getState.statename}>{getState.statename}</option>
                                                )};
                                            </select>
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>City <span className="red">*</span></label>
                                            <select name="city" id="city" className="form-control chosen-select" ref={register} >
                                                {cities.map(getCity =>
                                                    <option key={getCity.cityname} value={getCity.cityname}>{getCity.cityname}</option>
                                                )};
                                            </select>
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Address <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="address" name="address"  ref={register} />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Pincode <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="pincode" name="pincode"  ref={register} />
                                        </div>
                                    </div>
                                    <br/>
                                    <center>
                                        <button type="submit" name="submit" className="btn btn-success"><i className="fa fa-save"></i> Create</button>&nbsp;&nbsp;
                                        <button className="btn btn-warning" onClick={() => history.push('/rso')}><i className="fa fa-arrow-left"></i> Back</button>
                                    </center>
                                </form>

                                </div>
                            </div>		
                        </section>
                        
                    </div>
                </div>
            }
        </>
    );
}
export default AddUser;