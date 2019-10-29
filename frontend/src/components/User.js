import React from "react";

const User = ({ user, setUserToEdit, toggleEditing, deleteUser }) => {
    return (
        <div className="user">
            <h3>{user.name}</h3>
            <p>{user.bio}</p>
            <button onClick={() => {
                setUserToEdit(user);
                toggleEditing();
            }}>Edit</button>
            <button onClick={() => delete (user.id)}>Delete</button>
        </div>
    );
}

export default User;