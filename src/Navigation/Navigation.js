import React, {Component} from 'react';
import './Navigation.css';
import {Link} from "react-router-dom";

class Navigation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="Navigation">
                <ul>
                    <li className="header-left"><Link to="/">Home</Link></li>
                    {localStorage.getItem('isAdmin')&& localStorage.getItem('isAdmin')!=-1 ? <div>
                        <li>
                            <Link to="/logout" onClick={this.props.logout}>Logout</Link>
                        </li>
                        <li>
                            <Link to="/create">Create Course</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>

                    </div> : (this.props.username ? <div>
                        <li>
                            <Link to="/logout" onClick={this.props.logout}>Logout</Link>
                        </li>
                        <li>
                            <Link to="/mycourses">My Courses</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>

                    </div> : <div >
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li >
                            <Link to="/register">Register</Link>
                        </li>
                    </div>)}
                </ul>
            </nav>
        );
    }
}

export default Navigation;
