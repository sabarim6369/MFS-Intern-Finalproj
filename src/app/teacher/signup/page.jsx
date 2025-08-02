'use client'
import Head from 'next/head';
import { useState } from 'react';
import './style.css';
import { useRouter } from 'next/navigation';

export default function TeacherSignup() {
    const router = useRouter();

  const [formData, setFormData] = useState({
    role: '',
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { role, fullName, email, password } = formData;

    if (!role || !fullName || !email || !password) {
      alert('Please fill all fields');
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role, fullName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Signup failed');
        return;
      }

      alert('Signup successful! You can now log in.');
      router.push('/teacher/login'); 
      setFormData({ role: '', fullName: '', email: '', password: '' });
    } catch (err) {
      console.error('Signup error:', err);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <>
      <Head>
        <title>Teacher Signup</title>
      </Head>
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Create Your Account</h2>

          <div className="input-group">
            <label>Role</label>
            <select
              required
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="auth-select"
            >
              <option value="">Select Role</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>

          <button type="submit" className="auth-btn">Sign Up</button>
        </form>
      </div>
    </>
  );
}
