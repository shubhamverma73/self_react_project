import React from 'react';


const Home = () => {

    document.title = 'Home';

    return (
        <>
            <div>
                <div class="login-box">
                    <div class="login-logo">
                        <a href="<?php echo base_url(); ?>">
                            <img width="300px" height="auto" src="#" alt="Echo Super Seller Scheme" />
                        </a>
                    </div>
                    <div class="login-box-body">
                        <div id="login-form">
                            <p class="login-box-msg">Sign in to start your session</p>

                            <form action="<?php echo current_url(); ?>" method="post">
                                <div class="form-group has-feedback">
                                    <input type="text" class="form-control" name="username" placeholder="Email or Username" required />
                                    <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                                </div>
                                <div class="form-group has-feedback">
                                    <input type="password" class="form-control" name="password" placeholder="Password" required />
                                    <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                                </div>
                                <div class="row">
                                    <div class="col-xs-8">
                                        <div class="checkbox icheck">
                                            <label>
                                                <input type="checkbox" required /> I Accept <a href="#" target="_blank"> Terms &amp; Condition.</a>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col--xs-4">
                                        <a href="#" class="forgot_password"> Forgot password</a><br/>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12">
                                    </div>
                                    <div class="col-xs-12">
                                        
                                    </div>
                                    <div class="col-xs-12">
                                        <button type="submit" name="sign_in" class="btn btn-success btn-block btn-flat">Sign In</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div id="forgot-form">
                            <p class="forgot-box-msg">In case you forgot your password, don't worry. We'll help you to get your account access back. Just enter your email address, we'll send you an email with change password link.</p>
                            <form action="#" method="post">
                                <div class="form-group has-feedback">
                                    <input type="email" class="form-control" name="forgot_email" placeholder="Email" required />
                                    <i class="fa fa-envelope form-control-feedback"></i>
                                </div>
                                <div class="row">
                                    <div class="col-md-8">
                                        <a href="#" class="back_to_login">Back To Login</a>
                                    </div>
                                    <div class="col-md-4">
                                        <button type="submit" class="btn btn-success btn-block btn-flat" name="sign_in" value="forgot">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>	
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;