import React,{ useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { getAllUsers } from "../../util/APIUtils";
import './ListAllUser.scss'

export function ListAllUser(props) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers().then(data => setUsers(data));
    }, []);
    
    return (
        <div>
            {props.authenticated &&(
                <table className="table-latitude">
                <caption>User Information</caption>
                    <thead>
                        <tr>
                            <th> First Name</th>
                            <th> Last Name</th>
                            <th> Email</th>
                            <th> Roles</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            users.map(
                                user => 
                                <tr key = {user.id}>
                                    <td> {user.firstName} </td>
                                    <td> {user.lastName} </td>
                                    <td> {user.email} </td>
                                    <td> {user.roles.map(role => role.name+' ')} </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            )}
        </div>
        
    )
      
}

export default ListAllUser;


