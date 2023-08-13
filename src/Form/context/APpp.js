import React from 'react';
import ReactDOM from 'react-dom';
import { ValidationProvider } from './ValidationContext';
import UserForm from './UserForm';

function App() {
  return (
    <ValidationProvider>
      <UserForm />
    </ValidationProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
