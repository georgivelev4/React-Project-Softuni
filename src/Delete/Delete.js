import React, {Component} from 'react';
import './Delete.css'
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Delete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: this.props.courseObj
        }

    }


    render() {
        return <div className="Delete">
            <div className="container">
                <h2>{this.props.courseObj.title}</h2><img alt="courseImage"
                                                          src={this.props.courseObj.imageUrl}/><h2
                className="price">Course
                cost: $ {this.props.courseObj.cost}</h2>
                <h2>Description: </h2><textarea readOnly rows="4" cols="50">

                {this.props.courseObj.description}
            </textarea>
                <br/>
                <Link to="/deletecourse" className="delete-course-btn"
                      onClick={(event) => this.props.handleDelete(event)
                      }>Delete Course</Link>
            </div>

        </div>
    }

}

export default Delete;