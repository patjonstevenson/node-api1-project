import React, { useState, useEffect } from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

function App() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(false);
  const [userToEdit, setUserToEdit] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    console.log(userToEdit);
    console.log(editing);
  }, [userToEdit]);

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const deleteUser = id => {
    axios
      .delete(`http://localhost:5000/api/users/${id}`)
      .then(res => {
        console.log(`\nUser successfully deleted:\n${res}\n`);
      })
      .catch(err => console.log(`\nError deleting user:\n${err}\n`));
  };

  return (
    <div className="App">
      <header>
        <h1>Users</h1>
      </header>
      <div>
        <UserForm
          userToEdit={userToEdit}
          editing={editing}
          toggleEditing={toggleEditing}
          users={users}
          setUsers={setUsers}
        />
        <UserList
          users={users}
          setUserToEdit={setUserToEdit}
          toggleEditing={toggleEditing}
          deleteUser={deleteUser}
        />
      </div>
    </div>
  );
}

export default App;
