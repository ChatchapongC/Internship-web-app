import React, { Component } from 'react'
import UserService from '../services/UserService'

class ListUser extends Component {
    constructor(props) {
        super(props)

        this.state = {users: [] }
    }

    componentDidMount(){
        UserService.getUsers().then((res) => {
            this.setState({ users: res.data});

        });
    }
    
    render() {
        return (
            <div>
                <h2 className="text-center">User Information</h2>

                    <table>
                        <thead>
                            <tr>
                                <td> First Name</td>
                                <td> Last Name</td>
                                <td> Email</td>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.users.map(
                                    user => 
                                    <tr key = {user.id}>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.useremail}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
            </div>
            
        )
    }
}

export default ListUser