// ValidationContext.js
import React, { createContext, useContext, useState } from 'react';

const ValidationContext = createContext();

export const useValidation = () => {
  return useContext(ValidationContext);
};

export const ValidationProvider = ({ children }) => {
  const [errors, setErrors] = useState({});
  
  const validate = (name, value) => {
    let error;
    switch (name) {
      case "name":
        error = value ? "" : "Name is required.";
        break;
      case "email":
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        error = emailRegex.test(value) ? "" : "Invalid email format.";
        break;
      case "age":
        error = value >= 18 ? "" : "Age must be above 18.";
        break;
      case "gender":
        error = value ? "" : "Gender is required.";
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    return !error; // return true if no error
  };

  return (
    <ValidationContext.Provider value={{ errors, validate }}>
      {children}
    </ValidationContext.Provider>
  );
};
