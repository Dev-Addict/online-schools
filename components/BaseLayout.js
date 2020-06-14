import Head from 'next/head';

import Header from "./Header";
import BasePage from "./BasePage";

const BaseLayout = ({children, className = '', auth, title = ''}) => {

    return (
        <div className="base-layout-container">
            <Head>
                <title>Online Schools{title ? ` - ${title}` : ''}</title>
            </Head>
            <Header auth={auth}/>
            <main className={`base-layout-main ${className}`}>
                <div className="base-layout-base-page-container">
                    <BasePage title={title}>
                        {children}
                    </BasePage>
                </div>
            </main>
        </div>
    );
};

export default BaseLayout;