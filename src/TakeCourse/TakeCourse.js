import React, {Component} from 'react';
import './TakeCourse.css'
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class TakeCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: this.props.courseObj
        }

    }


    render() {
        return <div className="TakeCourse">
            <div className="container">
                <h2>{this.props.courseObj.title}</h2><img alt="courseImage"
                                                          src={this.props.courseObj.imageUrl}/><h2
                className="price">Course
                cost: $ {this.props.courseObj.cost}</h2>
                <h2>Description: </h2><textarea readOnly rows="4" cols="50">

                {this.props.courseObj.description}
            </textarea>

                <br/>
                <Link to="/takecourse" className="take-course-btn"
                      onClick={(event) => {
                          let username = localStorage.getItem('username');
                          fetch('http://localhost:9999/feed/takecourse', {
                              method: 'POST',
                              headers: {'Content-Type': 'application/json'},
                              body: JSON.stringify({id: this.state.course._id, username: username, token: this.props.token})
                          });
                          this.props.redirect();
                          toast.success('Course taken successfully!', {
                              position: "bottom-left",
                          });
                      }
                      }>Take Course</Link>
            </div>

        </div>
    }

}

export default TakeCourse;