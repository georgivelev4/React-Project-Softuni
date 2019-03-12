import React, {Component} from 'react';
import './Home.css'
import {Link} from "react-router-dom";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            courseName: null
        };
        this.handleChange = this.props.handleChange.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:9999/feed/courses')
            .then(res => res.json())
            .then(body => this.setState({
                courses: body.courses,
            }))
            .catch(error => console.log(error))

    }
    render() {
        return (
            <div className="Home">
                {this.props.username ? (
                        localStorage.getItem('isAdmin') && localStorage.getItem('isAdmin') != -1
                            ?
                            <div>
                                <div id="container">
                                    {this.state.courses.map((course) => (
                                        <div key={course._id} className="course"><h2>{course.title}</h2><img alt="course"
                                                                                                             className="home-jpg"
                                                                                                             src={course.imageUrl}/>
                                            <h2 className="price">Course cost: $ {course.cost}</h2>
                                            <Link to="/edit"
                                                  className="edit-course-btn" onClick={(event) => {
                                                this.props.getCourseOBJECT(course._id);
                                            }}>Edit Course</Link>
                                            <Link to="/delete"
                                                  className="delete-course-btn" onClick={(event) => {

                                                this.props.getCourseOBJECT(course._id);
                                            }}>Delete Course</Link>
                                        </div>))}
                                </div>
                            </div>

                            :
                            <div>
                                <div id="container">
                                    {this.state.courses.map((course) => (
                                        <div key={course._id} className="course"><h2>{course.title}</h2><img
                                            alt="courseImage"
                                            className="home-jpg"
                                            src={course.imageUrl}/><h2 className="price">Course cost: $ {course.cost}</h2>
                                            <Link to="/takecourse" className="take-course-btn" onClick={(event) => {
                                                this.props.getCourseOBJECT(course._id);
                                            }}>Take Course</Link>
                                        </div>))}
                                </div>

                            </div>
                    )
                    :
                    <div className="background-img">
                        <img className="anon-img" rel="background-img" alt="backgroundImage"
                             src="http://www.slate.com/content/dam/slate/articles/arts/culturebox/2015/09/first_person_essays/150911_CBOX_FirstPerson-Lede.gif.CROP.promo-xlarge2.gif"/>
                        <Link className="home-pic" to='/register'>Get Started!</Link>
                    </div>}
            </div>
        );
    }
}

export default Home;
