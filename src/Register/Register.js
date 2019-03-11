import React, {Component} from 'react';
import './Register.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            email: null,
            password: null,
            repeatPassword: null
        };
        this.handleChange = this.props.handleChange.bind(this);

    }

    render() {
        return (
            <div className="Register">
                <img alt="backgroundPicture" src="https://library.leeds.ac.uk/images/1400x700_edward_boyle_reception.jpg"/>
                <form action="/" onSubmit={(event) => this.props.handleSubmit(event, this.state, true)}>
                    <h1>Register</h1>
                    <label htmlFor="username">Username</label>
                    <input type="text" onChange={this.handleChange} name="username" id="username"
                           placeholder="georgivelev4"/>
                    <label htmlFor="email">Email</label>
                    <input type="text" onChange={this.handleChange} name="email" id="email"
                           placeholder="georgivelev4@gmail.com"/>
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={this.handleChange} name="password" id="password"
                           placeholder="******"/>
                    <label htmlFor="repeatPassword">Repeat Password</label>
                    <input type="password" onChange={this.handleChange} name="repeatPassword" id="repeatPassword"
                           placeholder="******"/>
                    <input type="submit" value="Register"/>
                </form>
            </div>);
    }
}

export default Register;
