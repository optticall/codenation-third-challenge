import React, { Component } from 'react';
import { login, register, isLogged } from '../services/loginService';

class Login extends Component {
    state = {
        username: '',
        password: '',
        error: ''
    }

    handleLogin = e => {
        e.preventDefault();
        
        try { 
            login(this.state);
            this.props.history.push("/");
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    handleRegister = e => {
        e.preventDefault();
        
        if(this.state.username === '' || !this.state.password === '')
            return this.setState({ error: 'User/Password can not be Empty'});
            
        try{ 
            register(this.state);
            login(this.state);
            this.props.history.push("/");
        } catch (err){
            this.setState({ error: err.message });
        }
    }

    render = () => {
        if(isLogged()) this.props.history.push("/")

        return (
        <form className="form-signin"> 
            <div className="text-center mb-4">
                <h1 className="h3 mb-3 font-weight-normal">Login / Register</h1>
            </div>
    
            <div className="form-label-group">
                <label htmlFor="inputEmail">Username</label>
                <input
                    name="username"
                    onChange={({target}) => this.setState({ username: target.value, error: '' })}
                    value={this.state.username}
                    className="form-control"
                    placeholder="Username"
                    required
                />
            </div>
    
            <div className="form-label-group mt-2">
                <label htmlFor="inputPassword">Password</label>
                <input
                    name="password"
                    onChange={({ target }) => this.setState({ password: target.value, error: '' })}
                    value={this.state.password}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                />
            </div>
    
            <div className="mt-5">
                <div 
                    role='alert'
                    className={this.state.error ? 'alert alert-danger': ''} 
                    onClick={() => this.setState({ error: ''})}>{ this.state.error }
                </div>
                <button 
                    className="login btn btn-lg btn-primary btn-block" 
                    type="submit" 
                    onClick={this.handleLogin}>Login
                </button>
                <button 
                    className="register btn btn-lg btn-secondary btn-block" 
                    type="submit" 
                    onClick={this.handleRegister}> Register
                </button>
            </div>
        </form>
    )}
}

export default Login;