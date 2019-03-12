import React, {Component} from 'react';
import './Edit.css'
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: null,
            startingCourse: this.props.courseObj
        };
        this.handleChange= this.props.handleChange.bind(this);

    }


    render() {
        return <div className="Edit">
            <div className="container">
                <img alt="backgroundPicture"  src="http://www.learnod.com/img/courses/technical-analysis-online-course.jpg"/>
                <form action="/" onSubmit={(e) => e.preventDefault()}>
                    <h1>Edit Course</h1>
                    <label htmlFor="title">Title</label>
                    <input type="text" onChange={this.handleChange} name="title" id="title"
                           defaultValue={this.props.courseObj.title}/>
                    <label htmlFor="description">Description</label>
                    <input type="text" onChange={this.handleChange} name="description" id="description"
                           defaultValue={this.props.courseObj.description}/>
                    <label htmlFor="imageUrl">Image URL</label>
                    <input type="text" onChange={this.handleChange} name="imageUrl" id="imageUrl"
                           defaultValue={this.props.courseObj.imageUrl}/>
                    <label htmlFor="cost">Course Cost</label>
                    <input type="text" onChange={this.handleChange} name="cost" id="cost"
                           defaultValue={this.props.courseObj.cost}/>
                    <Link to="/editcourse" className="edit-course-btn"
                          onClick={(event) => {
                              this.props.handleEdit(event, this.props.courseObj._id, this.state)
                          }
                          }>Edit Course</Link>
                </form>

            </div>

        </div>
    }

}

export default Edit;