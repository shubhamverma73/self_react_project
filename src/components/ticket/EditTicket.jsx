import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {NavLink, Redirect, useHistory } from 'react-router-dom';

const EditTicket = () => {

    document.title = 'Edit Ticket';
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
        ticket_id: "",
        store_id: "",      
        store_name: "",      
        rso_code: "",
        user_type: "",
        ticket_related: "",
        description: "",
        remarks: "",
        status: ""
    });

    const { ticket_id, store_id, store_name, rso_code, user_type, ticket_related, description, remarks, status } = user;

    const loadUsers = async (event) => {
        let items = { "username": localData.username, "token": localData.token, "id": id };
        const formData = JSON.stringify(items); 
        const response = await fetch("http://localhost/omron_app_api/api/view_ticket", {
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
        let result = await fetch("http://localhost/omron_app_api/api/edit_ticket", {
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
                                            <label>Ticket ID <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="ticket_id" name="ticket_id" value={ticket_id} ref={register} readOnly />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>RSO Code <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="rso_code" name="rso_code" value={rso_code} ref={register}  readOnly />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Store ID <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="store_id" name="store_id" value={store_id} ref={register} readOnly />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Store Name<span className="red">*</span></label>
                                            <input type="text" className="form-control" id="store_name" name="store_name" value={store_name} ref={register} readOnly />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>User Type <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="user_type" name="user_type" value={user_type}  ref={register} readOnly />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Ticket Related <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="ticket_related" name="ticket_related" value={ticket_related}  ref={register} readOnly />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Description <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="description" name="description" value={description}  ref={register} readOnly />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Status <span className="red">*</span></label>
                                            <select name="status" id="status" className="form-control chosen-select" ref={register} >
                                                <option value="Pending" selected={status === 'Pending' ? true : false} >Pending</option>
                                                <option value="Closed" selected={status === 'Closed' ? true : false} >Closed</option>
                                                <option value="Reject" selected={status === 'Reject' ? true : false} >Reject</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Remarks <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="remarks" name="remarks" value={remarks}  ref={register} />
                                        </div>
                                    </div>
                                    <br/>
                                    <center>
                                        <button type="submit" name="submit" className="btn btn-success"><i className="fa fa-save"></i> Save Changes</button>&nbsp;&nbsp;
                                        <button className="btn btn-warning" onClick={() => history.push('/ticket')}><i className="fa fa-arrow-left"></i> Back</button>
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
export default EditTicket;