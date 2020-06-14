import Link from "next/link";

import BaseLayout from "../components/BaseLayout";

const Home = ({auth}) => {
    return (
        <BaseLayout auth={auth} title="Home">
            {!auth.isSignedIn &&
            <div className="welcome">
                <div className="content">
                    Welcome to Online Schools. Online Schools is a management system for schools and also there is ready
                    classes of lessons you may have missed in the school to learn. In here you can manage your school or
                    get updated with messages from your schools or create classes and make money by creating classes for
                    students.
                </div>
                <div className="action-block">
                    Sign up for free as a student, a school manager or a teacher :
                    <Link href="/sign">
                        <a>
                            <button>Sign Up for free</button>
                        </a>
                    </Link>
                </div>
            </div>
            }
        </BaseLayout>
    );
};

export default Home;