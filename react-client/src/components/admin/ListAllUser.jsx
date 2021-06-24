import React,{ useEffect, useState } from "react";
import { getAllUsers } from "../../util/APIUtils";

function ListAllUser() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers().then(data => setUsers(data));
    }, []);
    
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
                            users.map(
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

export default ListAllUser;


