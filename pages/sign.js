import {useState} from 'react';

import BaseLayout from "../components/BaseLayout";

const Sign = ({auth}) => {
    const [isSignIn, setSignIn] = useState(true);

    const [rote, setRote] = useState('manager');

    return (
        <BaseLayout auth={auth} title="Sign Up / In">
            <div className="sign-form" style={{height: isSignIn ? 300 : 600}}>
                <div className="sign-buttons">
                    <button className={`sign-toggle-look ${isSignIn ? 'left' : 'right'}`} type="button"/>
                    <button className="sign-toggle" onClick={() => setSignIn(true)} type="button">
                        Sign In
                    </button>
                    <button className="sign-toggle" onClick={() => setSignIn(false)} type="button">
                        Sign Up
                    </button>
                </div>
                <form className={isSignIn ? 'active' : ''}>
                    <input type="text" placeholder="username" required/>
                    <input type="password" placeholder="password" required/>
                    <button type="submit">Sign In</button>
                </form>
                <form className={isSignIn ? '' : 'active'}>
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
                    <input type="text" placeholder="username" required/>
                    <input type="email" placeholder="email" required/>
                    <input type="text" placeholder="first name" required/>
                    <input type="text" placeholder="last name" required/>
                    <input type="password" placeholder="password" required/>
                    <span className="message">By signing up you are agreeing to I.R.I rules for websites</span>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </BaseLayout>
    );
};

export default Sign;