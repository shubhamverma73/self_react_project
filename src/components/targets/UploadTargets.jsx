import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {NavLink, Redirect, useHistory } from 'react-router-dom';
import upload_cloud from '../../assets/img/upload_cloud.png';
import sample_file from '../../data/targets/demo/Targets.csv';

const AddUser = () => {

    document.title = 'Upload Targets';
    let localData = localStorage.getItem('is_login');
    localData = JSON.parse(localData);

    let history = useHistory();
    const { register, handleSubmit } = useForm([]);
    const[showMessage, setshowMessage] = useState('hide');
    const[messageType, setmessageType] = useState('success');
    const[message, setMessage] = useState();

    const onSubmit = async (data) => {
        let items = {...data, "username": localData.username, "token": localData.token};
        let formData = new FormData();
        formData.append("csv_file", data.csv_file[0]);
        formData.append("formData", JSON.stringify(items));
        let result = await fetch("http://localhost/omron_app_api/api/upload-targets", {
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
                            <NavLink className="pull-right btn btn-success" style={{marginRight:"10px"}} exact to="/targets"><i className="fa fa-list"></i> Targets </NavLink>
                            <h1>{document.title}</h1>
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
                                    <div className="col-md-12 text-center">
                                        <h1 className="upload_heading" >Upload Your Target </h1>
                                    </div>
                                    <div className="spacer-20"></div>
                                    <div className="col-md-5">
                                        <div className="upload_box">
                                            <div className="spacer-30"></div>
                                            <div className="borderd_box">
                                                <div className="spacer-30"></div>
                                                <div>
                                                    <button type="button" id="browse-btn" className="btn square box-shadow-1 mt-2 upload_bb" >
                                                        <img src={upload_cloud} alt="Upload Targets" />
                                                        <div className="text_in"> Drag Your File Here or <span>Browse</span>
                                                        </div>
                                                    </button><br/><br/>
                                                    <input type="file" className="choose" name="csv_file" id="csv_file" accept=".csv" required=""  ref={register} />
                                                </div>
                                            </div>
                                        </div>	
                                    </div>
                                    <div className="col-md-7">
                                        <div className="upper_h2">The Conditons For File Uploading :</div>
                                        <hr/>
                                        <div className="col-m-12">
                                            <div className="row">
                                                <div className="col-md-12 conditions con">
                                                    <p><strong>Please do make sure that the file you upload is similar to this sample file. Also, no column should contain any commas(,)</strong></p>
                                                    <p>It must contain 5 columns in the following order:</p>
                                                    <p>1. ASM Code</p>
                                                    <p>2. Year</p>
                                                    <p>3. Month</p>
                                                    <p>4. QTR</p>
                                                    <p>5. Value</p>
                                                    <br/>
                                                    <a href={sample_file} className="btn btn-success btn-sm" target="_blank">View Sample</a>

                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <br/>
                                    <center>
                                        <button type="submit" name="submit" className="btn btn-success"><i className="fa fa-save"></i> Upload</button>&nbsp;&nbsp;
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