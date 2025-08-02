// pages/teacher/signup.js
import Head from 'next/head';
import './style.css'; // Update if placed elsewhere

export default function StudentSignup() {
  return (
    <>
      <Head>
        <title>Student Signup</title>
      </Head>
      <div className="auth-container">
        <form className="auth-form">
          <h2>Create Your Teacher Account</h2>

          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your name" required />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Create a password" required />
          </div>

          <div className="auth-extra">
            <a href="#" className="forgot-link">Forgot Password?</a>
          </div>

          <button type="submit" className="auth-btn">Sign Up</button>
        </form>
      </div>
    </>
  );
}
