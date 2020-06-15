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
            {auth.isSignedIn &&
            <div className="welcome">
                <div className="content">
                    Welcome back to Online Schools.
                </div>
                {auth.user.rote === 'admin' &&
                <div className="action-block">
                    You are the manager of everything. Manage Schools, students and teachers. Go to your dashboard.
                    <Link href="/dashboard">
                        <a>
                            <button>Admin Dashboard</button>
                        </a>
                    </Link>
                </div>
                }
                {auth.user.rote === 'manager' &&
                <div className="action-block">
                    You are the manager of your schools. Manage Students, the way stuff are going and teachers. Go to
                    your dashboard.
                    <Link href="/dashboard">
                        <a>
                            <button>Manager Dashboard</button>
                        </a>
                    </Link>
                </div>
                }
                {auth.user.rote === 'student' &&
                <div className="action-block">
                    Do your exams and homework and see your school events.
                    <Link href="/dashboard">
                        <a>
                            <button>Student Dashboard</button>
                        </a>
                    </Link>
                </div>
                }
                {auth.user.rote === 'content-creator' &&
                <div className="action-block">
                    Create classes and make money buy student enrolling.
                    <Link href="/dashboard">
                        <a>
                            <button>Teacher Dashboard</button>
                        </a>
                    </Link>
                </div>
                }
            </div>
            }
            <div className="services" id="services">
                <div className="main-title">Services</div>
                <div className="service">
                    <div className="title">Manage your school</div>
                    <div className="content">
                        Online Schools is system for schools and students to be in contact even when its not possible to
                        be in contact in physical way.
                    </div>
                </div>
                <div className="service">
                    <div className="title">Exams</div>
                    <div className="content">
                        With Online Schools you can create Exams with no problems and manage student marks and auto
                        create final marks with different methods.
                    </div>
                </div>
                <div className="service">
                    <div className="title">Lessons</div>
                    <div className="content">
                        With Online Schools you can upload lessons for you own students or upload it for all of the
                        Online Schools users and make money from selling this lessons or set it for free to give all the
                        students ability to learn for free.
                    </div>
                </div>
                <div className="service">
                    <div className="title">Homework</div>
                    <div className="content">
                        Online Schools give that ability to schools and teacher to set homework for student and get
                        homework from students the online way.
                    </div>
                </div>
                <div className="service">
                    <div className="title">Online Classes</div>
                    <div className="content">
                        Create Online Classes for Online Schools that way you can have students online and talk with
                        them the way it was in the school.
                    </div>
                </div>
            </div>
            <div className="about" id="about">
                <div>
                    Online Schools service has been created in 2020 in the corona virus time to help schools and
                    students to educate and push forward even in this type of times. The creator of Online Schools is
                    Aria Azadi Pour and the purpose of this website is to help schools students and teachers in the hard
                    times.
                </div>
                <div className="github">
                    <a href="https://github.com/AriaMAN-ACT" target="_blank">Github</a>
                    <a href="mailto:aria.azadi.pour@protonmail.com">Email</a>
                </div>
            </div>
        </BaseLayout>
    );
};

export default Home;