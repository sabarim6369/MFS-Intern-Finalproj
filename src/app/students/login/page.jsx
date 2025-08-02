// pages/teacher/login.js
import Head from 'next/head';
import './style.css';


export default function TeacherLogin() {
  return (
    <>
      <Head>
        <title>Teacher Login</title>
      </Head>
      <div className="auth-container">
        <form className="auth-form">
          <h2>Teacher Login</h2>

          <div className="input-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>

          <div className="auth-extra">
            <a href="#" className="forgot-link">Forgot Password?</a>
          </div>

          <button type="submit" className="auth-btn">Login</button>
        </form>
      </div>
    </>
  );
}
