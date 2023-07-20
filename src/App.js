import React, { useState } from "react";
import axios from "axios";
import SearchForm from "./SearchForm";
import UserList from "./UserList";
import RepositoryList from "./Repository";

import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [repositories, setRepositories] = useState([]);

  const searchUsers = async (username) => {
    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${username}`
      );
      setUsers(response.data.items);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getUserRepositories = async (username) => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      setRepositories(response.data);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  const handleUserSelect = (username) => {
    setSelectedUser(username);
    getUserRepositories(username);
    // Filter the users array to only keep the selected user in the list
    setUsers((prevUsers) => prevUsers.filter((user) => user.login === username));
  };

  return (
    <div>
      <h1>GitHub Repository Search</h1>
      <SearchForm onSearch={searchUsers} />
      {users.length > 0 && (
        <div>
          <h2>Users</h2>
          <UserList users={users} onUserSelect={handleUserSelect} />
        </div>
      )}
      {selectedUser && repositories.length > 0 && (
        <div>
          <h2>{`${selectedUser}'s Repositories`}</h2>
          <RepositoryList repositories={repositories} />
        </div>
      )}
    </div>
  );
};

export default App;
