import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {NavLink, Redirect, useHistory } from 'react-router-dom';

const EditUser = () => {

    document.title = 'Edit Store';
    let pathArray = window.location.pathname.split('/');

    let localData = localStorage.getItem('is_login');
    localData = JSON.parse(localData);

    let history = useHistory();
    const { register, handleSubmit } = useForm([]);
    const[showMessage, setshowMessage] = useState('hide');
    const[messageType, setmessageType] = useState('success');
    const[message, setMessage] = useState();

    let id = pathArray[3];
    
    const[store, setStore] = useState({
        retailer_code: "",
        retailer_name: "",
        email: "",
        mobile: "",
        zone: "",
        state: "",
        city: "",
        address: "",
        pincode: "",
        lat: "",
        long: "",         
        image: "",         
        status: ""
    });

    const { retailer_code, retailer_name, email, mobile, zone, state, city, address, pincode, lat, long, image, status } = store;

    const doNothing = () => {
        //do nothing
    }
    
    const loadStore = async (event) => {
        let items = { "username": localData.username, "token": localData.token, "id": id };
        const formData = JSON.stringify(items); 
        const response = await fetch("http://localhost/omron_app_api/api/view_store", {
            method: "POST",
            body: formData
        });
        const json = await response.json();
        if(json.status === "2") {
            setStore(json.data[0]);
        } else {
            alert('Record not found');
        }
    } 

    const onSubmit = async (data) => {
        let items = {...data, "username": localData.username, "token": localData.token, "id": id};

        let formData = new FormData();
        formData.append("image", data.image[0]);
        formData.append("formData", JSON.stringify(items));
        let result = await fetch("http://localhost/omron_app_api/api/edit_store", { //http://localhost/react/file_upload.php
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
                history.push('/stores');
            }, 5000);
        } else {
            setshowMessage('');
            setmessageType('danger');
            setMessage(result.message);
        }
    }
    
    useEffect(() => {
        loadStore();
    }, []);

    return (
        <>
            {
                !localStorage.getItem('is_login') ? <Redirect to='/' /> :
                <div>
                    <div className="content-wrapper"  style={{paddingTop: "10px"}}>        
                        <section className="content-header">
                            <h1>Edit Store</h1>
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
                                            <label>Retailer Code <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="retailer_code" name="retailer_code" defaultValue={retailer_code} ref={register} readOnly />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Retailer Name <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="retailer_name" name="retailer_name" defaultValue={retailer_name} ref={register} readOnly />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Email <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="email" name="email" defaultValue={email} ref={register}  readOnly />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Mobile <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="mobile" name="mobile" defaultValue={mobile}  ref={register} />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Zone <span className="red">*</span></label>
                                            <select name="zone" id="zone" className="form-control chosen-select" onChange={doNothing} ref={register} >
                                                <option value="East" selected={zone === 'East' ? true : false} >East</option>
                                                <option value="West" selected={zone === 'West' ? true : false} >West</option>
                                                <option value="North" selected={zone === 'North' ? true : false} >North</option>
                                                <option value="South" selected={zone === 'South' ? true : false} >South</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>State <span className="red">*</span></label>
                                            <select name="state" id="state" className="form-control chosen-select" ref={register} >
                                                <option defaultValue={state} >{state}</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>City <span className="red">*</span></label>
                                            <select name="city" id="city" className="form-control chosen-select" ref={register} >
                                                <option defaultValue={city} >{city}</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Address <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="address" name="address" defaultValue={address}  ref={register} />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Pincode <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="pincode" name="pincode" defaultValue={pincode} ref={register} />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Latitude<span className="red">*</span></label>
                                            <input type="text" className="form-control" id="lat" name="lat" defaultValue={lat} ref={register} />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Longitude<span className="red">*</span></label>
                                            <input type="text" className="form-control" id="long" name="long" defaultValue={long} ref={register} />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Status <span className="red">*</span></label>
                                            <select name="status" id="status" className="form-control chosen-select" onChange={doNothing} ref={register} >
                                                <option value="">Select Status</option>
                                                <option value="Approved" selected={status === 'Approved' ? true : false} >Approved</option>
                                                <option value="Inactive" selected={status === 'Inactive' ? true : false} >Inactive</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Image<span className="red">*</span></label>
                                            <input type="file" className="form-control" id="image" name="image" ref={register} />
                                            <a href={image} target="_blank"><img src={image} width="40" height="40" /></a>
                                        </div>
                                    </div>
                                    <br/>
                                    <center>
                                        <button type="submit" name="submit" className="btn btn-success"><i className="fa fa-save"></i> Update</button>&nbsp;&nbsp;
                                        <button className="btn btn-warning" onClick={() => history.push('/stores')}><i className="fa fa-arrow-left"></i> Back</button>
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