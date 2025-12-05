import { useState } from "react";
import PageWrapper from './PageWrapper';
import levelUp from '../assets/levelUp-logo.png';

const ForgotPassword = ({ onBackToLogin }) => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get('email');

    try {
    // Instead of calling a backend, just show a "Contact support" message
    await new Promise((resolve) => setTimeout(resolve, 500)); // optional: fake loading delay
    setSubmitted(true);
  } catch (err) {
    setError('Please contact support.');
  } finally {
    setIsLoading(false);
  }
};
// forgot password missing backend currently
/* 
    try {
      const response = await fetch('http://localhost:3000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset link.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    } 
  }; */

  return (
    <PageWrapper>
        <div className="auth-card">
          <div className="logo-container">
            <img src={levelUp} alt="LevelUp Logo" className="logo" />
          </div>
          {!submitted ? (
            <>
              <h2 className="auth-title">Forgot Password</h2>
              <p className="auth-subtitle">Enter your email to get a reset link.</p>
              
              <form className="form-stack" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="form-input top-single bottom-single" /* Single input needs both rounded */
                    style={{ borderRadius: '0.375rem' }}
                    placeholder="Email address"
                    disabled={isLoading}
                  />
                </div>

                {error && (
                  <div className="error-msg">
                    {error}
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary"
                  >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <h2 className="auth-title">Check your email</h2>
              <p className="auth-subtitle mt-4">
                If an account with that email exists, we've sent a link to reset your password.
              </p>
            </div>
          )}
          <div className="text-center mt-6">
            <button onClick={(e) => { e.preventDefault(); onBackToLogin(); }} className="link-btn">
              Back to Sign In
            </button>
          </div>
        </div>
    </PageWrapper>
  );
};

export default ForgotPassword;