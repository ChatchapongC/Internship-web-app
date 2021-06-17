import React, { Component } from 'react';
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
                                    <div className="text-avatar">
                                        <span>{this.props.currentUser.name && this.props.currentUser.name[0]}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="profile-name">
                           <h2>{this.props.currentUser.name}</h2>
                           <p className="profile-email">{this.props.currentUser.email}</p>
                           {/* <p>1{groups.id}</p>
                           <p>2{groups.business_name}</p>
                           <p>3{groups.title}</p> */}
                        </div>
                    </div>
                </div>  

            </div>
        );
    }
}

export default Profile