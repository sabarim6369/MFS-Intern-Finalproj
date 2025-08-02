'use client';
import Head from 'next/head';
import Link from 'next/link';

export default function Profile() {
  const teacher = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    subject: 'Mathematics',
    phone: '+91 9876543210',
  };

  return (
    <>
      <Head>
        <title>Teacher Profile</title>
      </Head>

      <div className="page-container">
        <div className="profile-card">
          <h1>Teacher Profile</h1>
          <div className="profile-info">
            <p><strong>Name:</strong> {teacher.name}</p>
            <p><strong>Email:</strong> {teacher.email}</p>
            <p><strong>Subject:</strong> {teacher.subject}</p>
            <p><strong>Phone:</strong> {teacher.phone}</p>
          </div>
          <Link href="/teacher/dashboard" className="back-link">← Back to Dashboard</Link>
        </div>
      </div>

      <style jsx>{`
        .page-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #e9efff;
        }

        .profile-card {
          background: white;
          padding: 3rem 4rem;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          max-width: 500px;
          width: 100%;
        }

        h1 {
          color: #3b49df;
          text-align: center;
          margin-bottom: 2rem;
        }

        .profile-info p {
          font-size: 1.2rem;
          margin: 0.8rem 0;
          color: #2e2e2e;
        }

        .back-link {
          display: block;
          margin-top: 2rem;
          text-align: center;
          color: #3b49df;
          font-weight: 600;
          text-decoration: none;
        }

        .back-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
