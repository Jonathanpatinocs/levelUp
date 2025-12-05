import { useState } from "react";
import PageWrapper from "./PageWrapper";
import levelUp from '../assets/levelUp-logo.png';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";


const SignUp = ({ onBackToLogin }) => {
  const { login } = useContext(AuthContext);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== data['confirm-password']) {
        setError("Passwords do not match");
        return;
    }

    setIsLoading(true);

      // will need to replace with actual backend URL if it is different
    try {
        const response = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: data.username,
                name: data['first-name'] + " " + data['last-name'],
                email: data.email,
                password: data.password
            }),
        });
        

        const result = await response.json();

        if (response.ok) { // auto log in
          
          login(result.token); 
          setSubmitted(true);
           // takes user to dashboard after signing up
          return; 
      }

        else {
            throw new Error(result.message || 'Email is invalid or already exists');
        }

        
    } catch (err) {
        setError(err.message || "An error occurred during sign up.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
        <div className="auth-card">
          {submitted ? (
             <div className="text-center">
                <div className="logo-container">
                    <img src={levelUp} alt="LevelUp Logo" className="logo" />
                </div>
                <h2 className="auth-title">Thank you for signing up!</h2>
                <p className="auth-subtitle mt-4">
                    Your account has been created successfully.
                </p>
                <div className="mt-6">
                    <button onClick={(e) => { e.preventDefault(); onBackToLogin(); }} className="link-btn">
                        Back to Sign In
                    </button>
                </div>
            </div>
          ) : (
            <>
              <div>
                <div className="logo-container">
                  <img src={levelUp} alt="LevelUp Logo" className="logo" />
                </div>
                <h2 className="auth-title">Create your account</h2>
                <p className="auth-subtitle">Join LevelUp to start your journey</p>
              </div>
              
              <form className="form-stack" onSubmit={handleSubmit}>
                <div className="input-group">
                  <div className="name-row">
                    <input name="first-name" type="text" required className="form-input" placeholder="First Name" />
                    <input name="last-name" type="text" required className="form-input" placeholder="Last Name" />
                  </div>
                  <input id="username" name="username" type="text" required className="form-input middle" placeholder="Username"/>
                  <input id="email-address" name="email" type="email" autoComplete="email" required className="form-input middle" placeholder="Email address" />
                  <input id="password" name="password" type="password" required className="form-input middle" placeholder="Password" />
                  <input id="confirm-password" name="confirm-password" type="password" required className="form-input bottom-single" placeholder="Confirm Password" />
                </div>

                {error && (
                    <div className="error-msg">
                        {error}
                    </div>
                )}

                <div>
                  <button type="submit" disabled={isLoading} className="btn-primary">
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>
              </form>
              <div className="text-center mt-6">
                <p className="auth-subtitle">
                  Already have an account?{' '}
                  <button onClick={(e) => { e.preventDefault(); onBackToLogin(); }} className="link-btn">
                    Sign in
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
    </PageWrapper>
  );
};

export default SignUp;