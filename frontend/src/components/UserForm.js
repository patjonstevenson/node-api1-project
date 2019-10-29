import React, { useState, useEffect } from "react";
import axios from "axios";

const UserForm = ({ editing, setEditing, userToEdit, toggleEditing }) => {
    const [newUser, setNewUser] = useState({ name: "", bio: "" });

    useEffect(() => {
        setNewUser(userToEdit);
    }, [userToEdit]);

    const handleChanges = e => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (editing) {
            axios
                .put(`http://localhost:5000/api/users/${newUser.id}`, newUser)
                .then(res => {
                    console.log(`\nUser successfully updated:\n${res}`);
                    setNewUser({ name: "", bio: "" });
                })
                .catch(err => console.log(`\nError updating user: \n${err}\n`));
        } else {
            axios
                .post("http://localhost:5000/api/users")
                .then(res => {
                    console.log(`\nNew user created:\n${res}`);
                    setNewUser({ name: "", bio: "" });
                })
                .catch(err => console.log(`\nError creating user: \n${err}\n`));
        }
    };

    const cancel = () => {
        setNewUser({ name: "", bio: "" });
        toggleEditing();
    };

    return (
        <div className="user-form">
            <form onSubmit={handleSubmit}>
                <input name="name" value={newUser.name} onChange={handleChanges} placeholder="Name" />
                <textarea name="bio" value={newUser.bio} onChange={handleChanges} placeholder="Bio" />
                <button type="submit">{editing ? "Edit" : "Add"}</button>
                <button onClick={cancel}>Cancel</button>
            </form>
        </div>
    );
};

export default UserForm;