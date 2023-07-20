import React from "react";
import "./UserList.css";

const UserList = ({ users, onUserSelect }) => {
  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id} className="user-item">
          <button onClick={() => onUserSelect(user.login)} className="user-button">
            {user.login}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
