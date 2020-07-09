import React from "react";

function UserList({users}){
    return(
        <div>
            {users.map(
                user => (
                    <div>
                    <h1>{user.name}</h1>
                    <p>{user.bio}</p>
                    </div>
                    )
            )}
        </div>
    )
}
export default UserList