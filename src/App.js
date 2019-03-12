import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Home from './Home/Home';
import Edit from './Edit/Edit';
import Navigation from './Navigation/Navigation';
import Register from './Register/Register';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import Create from './Create/Create';
import Delete from './Delete/Delete';
import MyCourses from "./MyCourses/MyCourses";
import TakeCourse from "./TakeCourse/TakeCourse";
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            isAdmin: false,
            courses: [],
            redirect: false,
            id: null,
            course: null,
            myCourses: []
        };
        this.logout = this.logout.bind(this);
    }

    getCourseObj(id) {
        let neededCourse = {};
        for (const course of this.state.courses) {
            if (course._id === id) {
                neededCourse = course;
            }
        }
        this.setState({
            course: neededCourse,
            id: id
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            this.setState({
                redirect: false
            });
            return <Redirect to='/'/>
        }
    };
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    componentDidMount() {
        const isAdmin = localStorage.getItem('isAdmin') && localStorage.getItem('isAdmin') != -1;
        if (localStorage.getItem('username')) {
            this.setState({
                username: localStorage.getItem('username'),
                isAdmin: isAdmin
            });
            fetch('http://localhost:9999/feed/mycourses',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: localStorage.getItem('username')
                    })
                })
                .then(res => res.json())
                .then((body) => {
                    this.setState({
                        myCourses: body.coursesNeeded
                    });
                });

        }
        fetch('http://localhost:9999/feed/courses')
            .then(res => res.json())
            .then(body => this.setState({
                courses: body.courses
            }))
            .catch(error => console.log(error));


    }

    logout() {
        localStorage.clear();
        this.setState({
            username: null,
            isAdmin: false
        });
        this.setRedirect();

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value

        });
    }

    handleDelete(event) {
        event.preventDefault();
        fetch('http://localhost:9999/feed/deletecourse', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.state.course._id})
        }).then(res => res.json())
            .then((body) => {
                fetch('http://localhost:9999/feed/courses')
                    .then(res => res.json())
                    .then(body => this.setState({
                        courses: body.courses
                    }))
                    .catch(error => console.log(error));
            });
        this.setRedirect();
        toast.success('Course deleted successfully!', {
            position: "bottom-left",
        });
    }

    handleEdit(event, id, data) {
        fetch('http://localhost:9999/feed/editcourse', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id, data: data})
        })
            .then(res => res.json())
            .then((body) => {
                if (body.courseFound) {
                    fetch('http://localhost:9999/feed/courses')
                        .then(res => res.json())
                        .then(body => this.setState({
                            courses: body.courses
                        }))
                        .catch(error => console.log(error));
                    this.setRedirect();
                    toast.success(`${body.message}`, {
                        position: "bottom-left",
                    });
                } else {
                    toast.error(`${body.message}`, {
                        position: "bottom-left",
                    });
                }

            });

    }

    handleSubmit(event, data, isSignUp, isCreate) {
        event.preventDefault();
        if (isCreate) {
            fetch('http://localhost:9999/feed/course/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then((body) => {
                    if (body.course) {
                        toast.success(`${body.message}`, {
                            position: "bottom-left",
                            autoClose: 4000,
                            closeButton: false
                        });
                        fetch('http://localhost:9999/feed/courses')
                            .then(res => res.json())
                            .then(body => this.setState({
                                courses: body.courses
                            }))
                            .catch(error => console.log(error));
                        this.setRedirect();
                    } else {
                        toast.error(`${body.message}`, {
                            position: "bottom-left",
                            autoClose: 4000,
                            closeButton: false
                        })
                    }


                }).catch(error => console.log(error))
        } else {
            fetch('http://localhost:9999/auth/sign' + (isSignUp ? 'up' : 'in'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then((body) => {
                    if (body.username) {
                        localStorage.setItem('username', body.username);
                        localStorage.setItem('isAdmin', body.isAdmin);
                        this.setState({
                            username: body.username,
                            isAdmin: body.isAdmin === 0
                        });
                        toast.success(`Welcome, Mr/Mrs ${this.state.username}!`, {
                            position: "bottom-left",
                            autoClose: 4000,
                            closeButton: false
                        });
                        this.setRedirect();

                    } else {
                        toast.error(`${body.message}`, {
                            position: "bottom-left",
                            autoClose: 4000,
                            closeButton: false
                        });
                    }

                }).catch((error) => {
                console.log(error);
            })
        }

    }

    render() {
        return (
            <div className="App">
                <ToastContainer/>
                <Navigation username={this.state.username} logout={this.logout}/>
                {this.renderRedirect()}
                {this.state.username ? <Redirect to="/"/> :
                    <Route path="/register" render={() => <Register handleChange={this.handleChange}
                                                                    handleSubmit={this.handleSubmit.bind(this)}/>}/>}

                {this.state.username ? <Redirect to="/"/> :
                    <Route path="/login" render={() => <Login handleChange={this.handleChange}
                                                              handleSubmit={this.handleSubmit.bind(this)}/>}/>}
                <Route exact path="/"
                       render={() => <Home username={this.state.username} courses={this.state.courses}
                                           handleChange={this.handleChange}
                                           getCourseOBJECT={this.getCourseObj.bind(this)}
                       />}/>
                {this.state.isAdmin ? <Route path="/create" render={() => <Create handleChange={this.handleChange}
                                                                                  handleSubmit={this.handleSubmit.bind(this)}/>}/> :
                    <Redirect to="/login"/>}
                {this.state.course !== null ? <Route exact path="/takecourse"
                                                     render={() => <TakeCourse courseObj={this.state.course}
                                                                               redirect={this.setRedirect.bind(this)}/>}/> :
                    <Redirect to="/"/>
                }
                {this.state.username ? <Route exact path="/mycourses"
                                              render={() => <MyCourses username={this.state.username}
                                                                       myCourses={this.state.myCourses}/>}/> :
                    <Redirect to="/login"/>}
                {this.state.username ? <Route exact path="/profile" render={() => <Profile isAdmin={this.state.isAdmin}
                                                                                           username={this.state.username}
                                                                                           email={this.state.email}/>}/> :
                    <Redirect to="/login"/>}
                {this.state.isAdmin ? <Route exact path="/delete" render={() => <Delete courseObj={this.state.course}
                                                                                        handleDelete={this.handleDelete.bind(this)}/>}/> :
                    <Redirect to="/login"/>}
                {this.state.isAdmin ? <Route exact path="/edit" render={() => <Edit handleChange={this.handleChange}
                                                                                    courseObj={this.state.course}
                                                                                    handleEdit={this.handleEdit.bind(this)}/>}/> :
                    <Redirect to="/login"/>}
            </div>
        );
    }
}

export default App;
