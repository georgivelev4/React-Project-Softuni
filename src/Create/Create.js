import React, {Component} from 'react';
import './Create.css';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            description: null,
            imageUrl: null,
            cost: null,
        };
        this.handleChange = this.props.handleChange.bind(this);
    }

    render() {
        return (
            <div className="Create">
                <div>
                    <img alt="backgroundPicture"  src="http://www.learnod.com/img/courses/technical-analysis-online-course.jpg"/>
                    <form action="/create" onSubmit={(e) => this.props.handleSubmit(e, this.state, false, true)}>
                        <h1>Create Course</h1>
                        <label htmlFor="title">Title</label>
                        <input type="text" onChange={this.handleChange} name="title" id="title"
                               placeholder="LEARN HTML IN 2 WEEKS"/>
                        <label htmlFor="description">Description</label>
                        <input type="text" onChange={this.handleChange} name="description" id="description"
                               placeholder="Description..."/>
                        <label htmlFor="imageUrl">Image URL</label>
                        <input type="text" onChange={this.handleChange} name="imageUrl" id="imageUrl"
                               placeholder="https://someCoursePic.jpg"/>
                        <label htmlFor="cost">Course Cost</label>
                        <input type="text" onChange={this.handleChange} name="cost" id="cost"
                               placeholder="999.99"/>
                        <input type="submit" value="Create"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default Create;
