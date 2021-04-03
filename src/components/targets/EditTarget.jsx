import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {NavLink, Redirect, useHistory } from 'react-router-dom';

const EditTarget = () => {

    document.title = 'Edit Target';
    let pathArray = window.location.pathname.split('/');

    let localData = localStorage.getItem('is_login');
    localData = JSON.parse(localData);

    let history = useHistory();
    const { register, handleSubmit } = useForm([]);
    const[showMessage, setshowMessage] = useState('hide');
    const[messageType, setmessageType] = useState('success');
    const[message, setMessage] = useState();

    let id = pathArray[3];
    
    const[target, setTarget] = useState({
        rso_code: "",
        year: "",
        month: "",
        qt: "",
        value: ""
    });

    const { rso_code, year, month, qt, value } = target;
    
    const loadTarget = async (event) => {
        let items = { "username": localData.username, "token": localData.token, "id": id };
        const formData = JSON.stringify(items); 
        const response = await fetch("http://localhost/omron_app_api/api/view_target", {
            method: "POST",
            body: formData
        });
        const json = await response.json();
        if(json.status === "2") {
            setTarget(json.data[0]);
        } else {
            alert('Record not found');
        }
    } 

    const onSubmit = async (data) => {
        let items = {...data, "username": localData.username, "token": localData.token, "id": id};
        const formData = JSON.stringify(items);
        let result = await fetch("http://localhost/omron_app_api/api/edit_target", { 
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
                history.push('/targets');
            }, 5000);
        } else {
            setshowMessage('');
            setmessageType('danger');
            var getMessage = result.message.toString();
            var errorArr = getMessage.split(',');
            var i;
            var errorMSG = '';
            for (i = 0; i < errorArr.length; i++) {
                errorMSG += errorArr[i]+'<br/>'
            }
            setMessage(errorMSG);
        }
    }
    
    useEffect(() => {
        loadTarget();
    }, []);

    return (
        <>
            {
                !localStorage.getItem('is_login') ? <Redirect to='/' /> :
                <div>
                    <div className="content-wrapper"  style={{paddingTop: "10px"}}>        
                        <section className="content-header">
                            <h1>Edit Target</h1>
                        </section>
                        <section className="content">
                            <div className="box">
                                <div className="box-body">
                                {
                                    (showMessage !== 'hide') ? 
                                    <div className={`alert alert-${messageType} ${showMessage}`} role="alert">
                                        <div dangerouslySetInnerHTML={{__html: message}} />
                                    </div>
                                    : ''
                                }                            
                                <form action="/" method="post" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row">
                                        <div className="form-group col-sm-4">
                                            <label>RSO Code <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="rso_code" name="rso_code" defaultValue={rso_code} ref={register} readOnly />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Year <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="year" name="year" defaultValue={year} ref={register} />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Month <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="month" name="month" defaultValue={month} ref={register} />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Quarter <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="qt" name="qt" defaultValue={qt}  ref={register} />
                                        </div>
                                        <div className="form-group col-sm-4">
                                            <label>Value <span className="red">*</span></label>
                                            <input type="text" className="form-control" id="value" name="value" defaultValue={value}  ref={register} />
                                        </div>
                                    </div>
                                    <br/>
                                    <center>
                                        <button type="submit" name="submit" className="btn btn-success"><i className="fa fa-save"></i> Update</button>&nbsp;&nbsp;
                                        <button className="btn btn-warning" onClick={() => history.push('/targets')}><i className="fa fa-arrow-left"></i> Back</button>
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
export default EditTarget;