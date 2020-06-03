import React, {Component} from 'react';
import './Login.css';

const Login = (props) => {
        return (
            <div>
            <section >
                <form>
                    <h2>Register</h2>
                    <input type="text" name="email" placeholder="Email" onChange={props.handleChange} value={props.email} />
                    <button style={{ fontSize: "15px" }} onClick={props.onRegister}>Login</button>
                </form>
            </section>
            </div>
        );
}

export default Login;