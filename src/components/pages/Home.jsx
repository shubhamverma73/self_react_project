import React, {useState}  from 'react';
import {useHistory, Redirect} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import logo from '../../assets/img/logo.png';

const Home = () => {

    document.title = 'Home';
    let history = useHistory();
    const { register, handleSubmit, errors } = useForm({
        mode: "onChange",
        //mode: "onTouched"
    });
    const[showMessage, setshowMessage] = useState('hide');
    const[messageType, setmessageType] = useState('success');
    const[message, setMessage] = useState();

    const onSubmit = async (data) => {
        let items = data;
        const formData = JSON.stringify(items);
        let result = await fetch("http://localhost/omron_app_api/api/login", {
            method: "POST",
            body: formData
        });
        result = await result.json();
        if(result.status === "2") {
            localStorage.setItem('is_login', JSON.stringify(result.data[0]));
            history.push('/dashboard');
        } else {
            setshowMessage('');
            setmessageType('danger');
            setMessage(result.message);
        }
        // ========================== Hide message after specific time period =================================
        setTimeout( () => {
            setshowMessage('hide');
        }, 5000);
    };

    return (
        <>
            {
                localStorage.getItem('is_login') ? <Redirect to='/dashboard' /> :
                <div>
                    <div className="login-box">
                    {
                        (showMessage !== 'hide') ? 
                        <div className={`alert alert-${messageType} ${showMessage}`} role="alert">
                            {message}
                        </div>
                        : ''
                    }
                        <div className="login-logo">
                            <a href={process.env.PUBLIC_URL}>
                                <img width="300px" height="auto" src={logo} alt="Echo Super Seller Scheme" />
                            </a>
                        </div>
                        <div className="login-box-body">
                            <div id="login-form">
                                <p className="login-box-msg">Sign in to start your session</p>
                                <form action="/" method="post" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group has-feedback"><p className="form-error">{errors.username && 'Username is required.'}</p>
                                        <input type="text" className="form-control" name="username" placeholder="Email or Username" ref={register({ required: true })} />
                                        <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                                    </div>
                                    <div className="form-group has-feedback"><p className="form-error">{errors.password && 'Password is required.'}</p>
                                        <input type="password" className="form-control" name="password" placeholder="Password" ref={register({ required: true })} />
                                        <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12"> </div>
                                        <div className="col-xs-12">
                                            <button type="submit" name="sign_in" className="btn btn-success btn-block btn-flat">Sign In</button>
                                        </div>
                                    </div>
                                </form>
                            </div>	
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Home;