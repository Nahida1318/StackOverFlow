import  { useState } from 'react';
import PropTypes from 'prop-types';


function Auth({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSignUp = async () => {
 
    const res = await fetch(`http://localhost:8000/auth/signUp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert('Signup successful');
    } else {
      const errorData = await res.json();
     
      alert(errorData.message)
    }
  };

  const handleSignIn = async () => {
   
    const res = await fetch(`http://localhost:8000/auth/signIn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setToken(data.token);
    } else {
      const errorData = await res.json();
    
      alert(errorData.message)
    }
  };

  return (
    <div className="w-1/5 flex flex-col items-center justify-center min-h-screen">

      <div className="w-full max-w-lg">
        <strong>Email:</strong>
        <input
          type="email"
          placeholder="Enter your email"
          className="block w-full p-3 mb-2 border rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <strong>Password:</strong>
        <input
          type="password"
          placeholder="Enter your password"
          className="block w-full p-3 mb-4 border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      
      <div className="w-full max-w-lg">
        <strong>Create Account:</strong>
        <button
          onClick={handleSignUp}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded mb-2"
        >
          Sign Up
        </button>
        <strong>Already have an account?</strong>
        <button
          onClick={handleSignIn}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded"
        >
          Sign In 
        </button>
       
      </div>
    </div>
  );
}

Auth.propTypes = {
  setToken: PropTypes.func.isRequired, // Define prop types for setToken
};
export default Auth;






