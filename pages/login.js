import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "../lib/authConfig";
import { removeURLParameters } from '../lib/helpers';

function login() {
    const router = useRouter();
    const [loginClicked, setLoginClicked] = useState(false);
    const errors = {
        internal_server_error: 'Something went wrong. Try again later',
        login_session_expired: 'Session expired. Please login again',
        user_not_found: 'User not found'
    }
    const get_err_msg = () => {
        if (errors[router.query.error_code]) {
            setTimeout(() => {
                removeURLParameters(['error_code']);
            }, 1000);
            return errors[router.query.error_code];
        }
        return errors['internal_server_error'];
    }
    const isAuthenticated = useIsAuthenticated();
    const { instance } = useMsal();
    const handleLogin = () => {
        setLoginClicked(true);
        instance.loginRedirect(loginRequest);
    }
    const LoginComponent = () => {
        if (isAuthenticated) {
            router.push("/"); return null;
        } else {
            return (
                <div className="login-container">
                    <div className="left-container">
                        <div className='login-inner'></div>
                    </div>
                    <div className="right-container">
                        <div className='login-wrapper' style={{ position: 'relative', minWidth: '360px' }}>
                            <h4 className='mb-0'>Welcome to <span className='theme-text'>EMS</span></h4>
                            <label>Login using Microsoft</label>
                            <Button variant="primary" disabled={loginClicked} className="d-block mt-4 w-100" onClick={handleLogin}>
                                {loginClicked ? 'Please wait...' : 'Login'}
                            </Button>
                            {router.query.error_code &&
                                <span className='error_message'>{get_err_msg()}</span>
                            }
                        </div>
                    </div>
                </div>
            );
        }
    }
    return <LoginComponent />;
}

export default login