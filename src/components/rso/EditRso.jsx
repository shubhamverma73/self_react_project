import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {NavLink, Redirect, useHistory } from 'react-router-dom';

const EditUser = () => {

    document.title = 'Edit RSO';
    let pathArray = window.location.pathname.split('/');

    let localData = localStorage.getItem('is_login');
    localData = JSON.parse(localData);

    let history = useHistory();
    const { register, handleSubmit } = useForm([]);
    const[showMessage, setshowMessage] = useState('hide');
    const[messageType, setmessageType] = useState('success');
    const[message, setMessage] = useState();

    let id = pathArray[3];
    
    const[user, setUser] = useState({
        username: "",
        name: "",      
        role: "",      
        email: "",
        mobile: "",
        zone: "",
        state: "",
        city: "",
        address: "",
        status: ""
    });

    const { username, name, role, email, mobile, zone, state, city, address, status } = user;

    const loadUsers = async (event) => {
        let items = { "username": localData.username, "token": localData.token, "id": id };
        const formData = JSON.stringify(items); 
        const response = await fetch("http://localhost/omron_app_api/api/view_rso", {
            method: "POST",
            body: formData
        });
        const json = await response.json();
        if(json.status === "2") {
            setUser(json.data[0]);
        } else {
            alert('Record not found');
        }
    } 

    const onSubmit = async (data) => {
        let items = {...data, "username": localData.username, "token": localData.token, "id": id};
        const formData = JSON.stringify(items);
        let result = await fetch("http://localhost/omron_app_api/api/edit_rso", {
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
    
    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <>
            {
                !localStorage.getItem('is_login') ? <Redirect to='/' /> :
                <div>
                    <div className="content-wrapper"  style={{paddingTop: "10px"}}>        
                        <section className="content-header">
                            <NavLink className="pull-right btn btn-success" style={{marginRight:"10px"}} exact to="/add-rso"><i className="fa fa-plus"></i> Add RSO </NavLink>
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
                                            <input type="text" className="form-control" id="username" name="username" value={username} ref={register} readOnly />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Email <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="email" name="email" value={email} ref={register}  readOnly />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Name <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="name" name="name" value={name} ref={register} />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Role<span className="red">*</span></label>
                                            <input type="text" className="form-control" id="role" name="role" value={role} ref={register} />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Mobile <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="mobile" name="mobile" value={mobile}  ref={register} />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Address <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="address" name="address" value={address}  ref={register} />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Zone <span className="red">*</span></label>
                                            <select name="zone" id="zone" className="form-control chosen-select" ref={register} >
                                                <option value="East" selected={zone === 'East' ? true : false} >East</option>
                                                <option value="West" selected={zone === 'West' ? true : false} >West</option>
                                                <option value="North" selected={zone === 'North' ? true : false} >North</option>
                                                <option value="South" selected={zone === 'South' ? true : false} >South</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>State <span className="red">*</span></label>
                                            <select name="state" id="state" className="form-control chosen-select" ref={register} >
                                                <option value={state} >{state}</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>City <span className="red">*</span></label>
                                            <select name="city" id="city" className="form-control chosen-select" ref={register} >
                                                <option value={city} >{city}</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Status <span className="red">*</span></label>
                                            <select name="status" id="status" className="form-control chosen-select" ref={register} >
                                                <option value="Approved" selected={status === 'Approved' ? true : false} >Approved</option>
                                                <option value="Inactive" selected={status === 'Inactive' ? true : false} >Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <br/>
                                    <center>
                                        <button type="submit" name="submit" className="btn btn-success"><i className="fa fa-save"></i> Save Changes</button>&nbsp;&nbsp;
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
export default EditUser;