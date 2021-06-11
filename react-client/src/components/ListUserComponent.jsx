import React, { Component } from 'react'
import UserService from '../services/UserService'

export class ListUser extends Component {
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

                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> First Name</th>
                                <th> Last Name</th>
                                <th> Email</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.users.map(
                                    user => 
                                    <tr key = {user.id}>
                                        <td> {user.firstName} </td>
                                        <td> {user.lastName} </td>
                                        <td> {user.userEmail} </td>
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