import React, { Component } from 'react';
import profileLogo from '../../img/profile-logo.png'
import './profile.scss';

class Profile extends Component {

    constructor(props) {
        super(props);
        // this.state = {groups: [], isLoading: true};
        console.log(props);
    }

    // async componentDidMount() {
    //     fetch('/job/1')
    //   .then(response => response.json())
    //   .then(data => this.setState({groups: data, isLoading: false}));
    // }

    render() {
        // const {groups, isLoading} = this.state;

        

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
                           <h2>{this.props.currentUser.name}</h2>
                           <p className="profile-email">{this.props.currentUser.email}</p>
                           {/* <p>1{this.props.jobList.id}</p>
                           <p>2{this.props.jobList.business_name}</p>
                           <p>3{this.props.jobList.title}</p> */}
                        </div>
                    </div>
                </div>  

            </div>
        );
    }
}

export default Profile