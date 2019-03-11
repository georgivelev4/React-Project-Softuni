import React, {Component} from 'react';
import './Profile.css';
class Profile extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="Profile">
            <div className="card">
                    <h1>Username: {this.props.username}</h1>
                {this.props.isAdmin?
                <img src="http://gvnpc.com/admin/images/login_icon.png" alt="adminPicture"/>:
                <img src="https://onlinemastery.ro/wp-content/uploads/2016/10/35778-200.png" alt="studentPicture"/>}
                {this.props.isAdmin?<p className="title">Head admin of Private Online School 2019</p>:<p className="title">Online student in Private Online School 2019</p>}
            </div>
        </div>
    }

}

export default Profile;