import React from 'react'
import { logout, isLogged } from '../services/loginService';
import { Redirect } from 'react-router-dom';

const User = ({...props}) => {
    if(!isLogged()) return <Redirect to='/' />;

    return (
    <button 
        className="btn btn-secondary" 
        onClick={() => {
            logout();
            props.history.push('/');
        }}>Logout</button>
)}

export default User