'use client';

import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import './style.css'; // Adjust path if needed

export default function TeacherLogin() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    role: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const { role, email, password } = formData;

  if (!role || !email || !password) {
    alert('Please fill all fields');
    return;
  }

  setLoading(true);
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Login failed');
      setLoading(false);
      return;
    }

    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }

    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    alert('Login successful! Redirecting...');

    if (role === 'teacher') {
      router.push('/teacher/dashboard');
    } else {
      router.push('/student/dashboard');
    }

  } catch (error) {
    console.error('Login error:', error);
    alert('Something went wrong. Please try again.');
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <Head>
        <title>Teacher Login</title>
      </Head>
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <div className="input-group">
            <label>Role</label>
            <select
              name="role"
              className="auth-select"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </>
  );
}
