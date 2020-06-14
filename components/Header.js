import {useState} from 'react';
import Router from "next/router";
import Link from "next/link";
import FontAwesome from 'react-fontawesome';

import onlineSchools from "../api/onlineschools";

const Header = ({auth: {isSignedIn}}) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <header>
            <div className="logo">Online Schools</div>
            <span className="bar-icon" onClick={() => setOpen(!isOpen)}>
                <FontAwesome name="bars"/>
            </span>
            <nav className={isOpen ? 'show' : 'hide'}>
                <ul className="nav-links">
                    <li>
                        <Link href="/services">
                            <a>
                                Services
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/about">
                            <a>
                                About
                            </a>
                        </Link>
                    </li>
                    {isSignedIn &&
                    <li>
                        <Link href="/dashboard">
                            <a>
                                Dashboard
                            </a>
                        </Link>
                    </li>
                    }
                </ul>
            </nav>
            {isSignedIn &&
            <a className={isOpen ? 'show' : 'hide'}>
                <button onClick={
                    () => onlineSchools.post('/users/auth/signout').then(() => Router.push('/'))
                }>
                    Sign Out
                </button>
            </a>
            }
            {!isSignedIn &&
            <Link href="/sign">
                <a className={isOpen ? 'show' : 'hide'}>
                    <button>Sign Up / In</button>
                </a>
            </Link>
            }
        </header>
    );
};

export default Header;