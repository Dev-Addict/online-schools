import {useState} from 'react';
import Router from "next/router";
import Cookie from 'js-cookie';

import BaseLayout from "../components/BaseLayout";
import onlineSchools from "../api/onlineschools";

const Sign = ({auth}) => {
    const [isSignIn, setSignIn] = useState(true);

    const [error, setError] = useState('');

    const [rote, setRote] = useState('manager');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const signInOnSubmit = event => {
        event.preventDefault();
        onlineSchools.post('/users/auth/signin', {
            username,
            password
        })
            .then((res) => {
                Cookie.set('jwtClient', res.data.data.token);
                Router.push('/dashboard');
            })
            .catch(error => setError(error.response.data.message));
    };

    const signUpOnSubmit = event => {
        event.preventDefault();
        onlineSchools.post('/users/auth/signup', {
            rote,
            username,
            password,
            email,
            firstName,
            lastName
        })
            .then((res) => {
                Router.push('/dashboard');
                Cookie.set('jwtClient', res.data.data.token);
            })
            .catch(error => setError(error.response.data.message));
    };

    return (
        <BaseLayout auth={auth} title="Sign Up / In">
            <div className="sign-form" style={{height: isSignIn ? 320 : 600}}>
                <div className="sign-buttons">
                    <button className={`sign-toggle-look ${isSignIn ? 'left' : 'right'}`} type="button"/>
                    <button className="sign-toggle" onClick={() => {
                        setSignIn(true);
                        setError('');
                    }} type="button">
                        Sign In
                    </button>
                    <button className="sign-toggle" onClick={() => {
                        setSignIn(false);
                        setError('');
                    }} type="button">
                        Sign Up
                    </button>
                </div>
                <form className={isSignIn ? 'active' : ''} onSubmit={signInOnSubmit}>
                    <input type="text" placeholder="username" required value={username}
                           onChange={({target: {value}}) => setUsername(value)}/>
                    <input type="password" placeholder="password" required value={password}
                           onChange={({target: {value}}) => setPassword(value)}/>
                    <button type="submit">Sign In</button>
                    <div className="error">{error}</div>
                </form>
                <form className={isSignIn ? '' : 'active'} onSubmit={signUpOnSubmit}>
                    <div className="rote">
                        <button className="rote-toggle-look" type="button" style={{
                            left: rote === 'manager' ? 0 : rote === 'content-creator' ? 73 : 145
                        }}/>
                        <button className="rote-toggle" type="button" onClick={() => setRote('manager')}>
                            Manager
                        </button>
                        <button className="rote-toggle" type="button" onClick={() => setRote('content-creator')}>
                            Teacher
                        </button>
                        <button className="rote-toggle" type="button" onClick={() => setRote('student')}>
                            Student
                        </button>
                    </div>
                    <input type="text" placeholder="username" value={username}
                           onChange={({target: {value}}) => setUsername(value)}/>
                    <input type="text" placeholder="email" value={email}
                           onChange={({target: {value}}) => setEmail(value)}/>
                    <input type="text" placeholder="first name" value={firstName}
                           onChange={({target: {value}}) => setFirstName(value)}/>
                    <input type="text" placeholder="last name" value={lastName}
                           onChange={({target: {value}}) => setLastName(value)}/>
                    <input type="password" placeholder="password" value={password}
                           onChange={({target: {value}}) => setPassword(value)}/>
                    <span className="message">By signing up you are agreeing to I.R.I rules for websites</span>
                    <button type="submit">Sign Up</button>
                    <div className="error">{error}</div>
                </form>
            </div>
        </BaseLayout>
    );
};

export default Sign;