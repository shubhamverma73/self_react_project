import React, {useEffect} from 'react';
import {Redirect, useHistory} from 'react-router-dom';

const Logout = () => {    
    let localData = localStorage.getItem('is_login');
    localData = JSON.parse(localData);
    let history = useHistory();

    const logoutData = async () => {
        let items = { "username": localData.username, "token": localData.token };
        const formData = JSON.stringify(items);
        let result = await fetch("http://localhost/omron_app_api/api/logout", {
            method: "POST",
            body: formData
        });
        result = await result.json();
        if(result.status === "2") {
            localStorage.clear(); 
            history.push('/');
        } else {
            alert('Not able to logout, try again');
        }
    }

    useEffect(() => {
        logoutData();
    }, []);

    return (
        <>
            <Redirect to='/' />
        </>
    );
}
export default Logout;