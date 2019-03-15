import React, {Component} from 'react';
import './MyCourses.css';


class MyCourses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myCourses: this.props.myCourses
        }
    }
    componentDidMount() {
        fetch('http://localhost:9999/feed/mycourses',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: localStorage.getItem('username'),
                    token: this.props.token
                })
            })
            .then(res => res.json())
            .then((body) => {
                this.setState({
                    myCourses: body.coursesNeeded
                });
            });
    }

    render() {
        return (
            <div className="MyCourses">
                {this.state.myCourses.map((course) => (
                    <div className="container">
                        <h2>{course.title}</h2>
                        <img alt="courseImage"
                                                    src={course.imageUrl}/><h2
                        className="price">Course
                        cost: $ {course.cost}</h2>
                        <h2>Description: </h2>
                        <textarea  readOnly rows="4" cols="50">
                            {course.description}
                        </textarea>
                    </div>
                ))}
            </div>
        );
    }
}

export default MyCourses;
