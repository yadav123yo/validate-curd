// UserForm.js
import React, { useState } from 'react';
import { useValidation } from './ValidationContext';

function UserForm() {
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    email: '',
    gender: ''
  });

  const { errors, validate } = useValidation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = Object.keys(userData).every(field =>
      validate(field, userData[field])
    );

    if (isValid) {
      console.log("Form Submitted", userData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={userData.name} onChange={handleChange} placeholder="Name" />
      <div>{errors.name}</div>

      <input name="age" value={userData.age} onChange={handleChange} type="number" placeholder="Age" />
      <div>{errors.age}</div>

      <input name="email" value={userData.email} onChange={handleChange} type="email" placeholder="Email" />
      <div>{errors.email}</div>

      <select name="gender" value={userData.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <div>{errors.gender}</div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;
