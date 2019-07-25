import React from 'react'
import { logout, isLogged } from '../services/loginService';

const User = ({...props}) => {
    if(!isLogged()) props.history.push("/");

    return (
    <button 
        className="btn btn-secondary" 
        onClick={() => { 
            logout()
            props.history.push("/");
        }}>Logout</button>
)}

export default User