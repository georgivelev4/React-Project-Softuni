import React, {Component} from 'react';
import './Login.css';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: null,
            password: null
        };
        this.handleChange = this.props.handleChange.bind(this);

    }
    render() {
        return (
            <div className="Login">
                <img alt="backgroundPicture" src="https://library.leeds.ac.uk/images/1400x700_edward_boyle_reception.jpg"/>
                <form action="/" onSubmit={(e)=>this.props.handleSubmit(e, this.state, false)}>
                    <h1>Login</h1>
                    <label htmlFor="usernameLogin">Username</label>
                    <input type="text" name="username" id="usernameLogin" placeholder="georgivelev4" onChange={this.handleChange}/>
                    <label htmlFor="passwordLogin">Password</label>
                    <input type="password" name="password" id="passwordLogin" placeholder="******" onChange={this.handleChange}/>
                    <input type="submit" value="Login"/>
                </form>
            </div>
        );
    }
}

export default Login;
