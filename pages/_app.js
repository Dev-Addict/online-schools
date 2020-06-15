import App from "next/app";
import Cookie from 'js-cookie';

import onlineSchools from '../api/onlineschools';
import '../style/main.css';

class _App extends App {
    static async getInitialProps({Component, router, ctx}) {
        let pageProps = {};
        const auth = {};

        const token = ((ctx.req || {}).cookies || {}).jwt || Cookie.get('jwtClient');

        try {
            if (!token) {
                throw new Error();
            }
            const userRes = await onlineSchools.post('/users/auth/checktoken', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            auth.isSignedIn = true;
            auth.user = userRes.data.data.user;
        } catch (err) {
            auth.isSignedIn = false;
        }

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx, auth);
        }

        return {pageProps, auth};
    }

    render() {
        const {Component, pageProps, auth} = this.props;

        return (
            <Component {...pageProps} auth={auth}/>
        );
    }
};

export default _App;