'use client'
import Head from 'next/head';
import Link from 'next/link';

export default function MyClasses() {
  // Dummy data for classes
  const classes = ['6A', '7B', '8C', '9D'];

  return (
    <>
      <Head>
        <title>My Classes</title>
      </Head>

      <div className="page-container">
        <h1>My Classes</h1>
        <ul className="classes-list">
          {classes.map((cls) => (
            <li key={cls}>{cls}</li>
          ))}
        </ul>

        <Link href="/teacher/dashboard">
          ← Back to Dashboard
        </Link>
      </div>

      <style jsx>{`
        .page-container {
          padding: 2rem 3rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f4f7ff;
          min-height: 100vh;
        }
        h1 {
          color: #3b49df;
          margin-bottom: 1.5rem;
        }
        .classes-list {
          list-style-type: none;
          padding: 0;
          font-size: 1.3rem;
          color: #334155;
        }
        .classes-list li {
          background: white;
          margin-bottom: 0.75rem;
          padding: 1rem 1.2rem;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(59, 73, 223, 0.1);
        }
        .back-link {
          display: inline-block;
          margin-top: 2rem;
          color: #3b49df;
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
        }
        .back-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
