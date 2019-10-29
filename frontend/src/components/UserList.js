import React from "react";
import User from "./User";

const UserList = ({ users, setUserToEdit, toggleEditing, deleteUser }) => {
    return (
        <div className="user-list">
            {users.map(user =>
                <User
                    key={user.id}
                    user={user}
                    setUserToEdit={setUserToEdit}
                    toggleEditing={toggleEditing}
                    deleteUser={deleteUser}
                />)}
        </div>
    );
}

export default UserList;