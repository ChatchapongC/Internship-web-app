import React, { Component } from 'react';
import profileLogo from '../../img/profile-logo.png'
import './profile.scss';

class Profile extends Component {

    constructor(props) {
        super(props);
        
        
    }

    render() {
        console.log(this.props.currentUser)
        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            {   
                                this.props.currentUser.imageUrl ? (
                                    <img src={this.props.currentUser.imageUrl} alt={this.props.currentUser.name}/>
                                ) : (
                                    <img src={profileLogo}></img>
                                )
                            }
                        </div>
                        <div className="profile-name">
                           <h2>{this.props.currentUser.firstName} {this.props.currentUser.lastName} </h2>
                           <p className="profile-email">{this.props.currentUser.email}</p>
                        </div>
                    </div>
                </div>  

            </div>
        );
    }
}

export default Profile