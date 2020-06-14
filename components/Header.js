import Router from "next/router";
import Link from "next/link";

import onlineSchools from "../api/onlineschools";

const Header = ({auth}) => {
    return (
        <div className="header-container">
            <Link href="/">
                <a className="link">
                    <div className="header-brand">Online Schools</div>
                </a>
            </Link>
            {!auth.isSignedIn &&
            <div className="header-buttons">
                <div className="sign-in"
                     onClick={() => {
                         Router.push('/sign');
                     }}>
                    Sign In
                </div>
                <div className="sign-up"
                     onClick={() => {
                         Router.push('/sign');
                     }}>
                    Sign Up
                </div>
            </div>
            }
            {auth.isSignedIn &&
            <div className="header-dashboard">
                <Link href="/dashboard">
                    <a className="link">Dashboard</a>
                </Link>
                <div className="sign-out"
                     onClick={() => {
                         onlineSchools.post('/users/auth/signout');
                         Router.push('/');
                     }}>
                    Sign Out
                </div>
            </div>
            }
        </div>
    );
};

export default Header;