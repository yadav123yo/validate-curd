// CURD OPERATION ON JSON SERVER.


import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState(null);

  const apiUrl = "https://jealous-bandanna-dog.cyclic.app/users";

  // READ
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(apiUrl);
        setUsers(response.data);
      } catch (error) {
        setError("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  // CREATE
  const addUser = async () => {
    try {
      const response = await axios.post(apiUrl, { name, age, gender });
      setUsers([...users, response.data]);
      setError(null);
    } catch (error) {
      setError("Failed to add user.");
    }
  };

  // UPDATE
  const updateUser = async (id) => {
    try {
      const updatedName = prompt("Enter new name:") || name;
      const updatedAge = prompt("Enter new age:") || age;
      const updatedGender = prompt("Enter new gender (Male/Female):") || gender;

      const response = await axios.put(`${apiUrl}/${id}`, {
        name: updatedName,
        age: updatedAge,
        gender: updatedGender
      });
      const updatedUsers = users.map((user) =>
        user.id === id ? response.data : user
      );
      setUsers(updatedUsers);
      setError(null);
    } catch (error) {
      setError("Failed to update user.");
    }
  };

  // DELETE
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      const remainingUsers = users.filter((user) => user.id !== id);
      setUsers(remainingUsers);
      setError(null);
    } catch (error) {
      setError("Failed to delete user.");
    }
  };

  return (
    <div>
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          type="number"
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <button onClick={addUser}>Add User</button>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h2>{user.name}</h2>
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
            <button onClick={() => updateUser(user.id)}>Update</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
