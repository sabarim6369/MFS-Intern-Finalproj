'use client';
import axios from 'axios'
import Head from 'next/head';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';

const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    style={{ marginRight: 12 }}
  >
    <path d="M3 13h8V3H3v10zM13 21h8v-6h-8v6zM13 3v6h8V3h-8zM3 21h8v-4H3v4z" />
  </svg>
);

const AddIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    style={{ marginRight: 12 }}
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const ClassesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    style={{ marginRight: 12 }}
  >
    <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ProfileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    style={{ marginRight: 12 }}
  >
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 21a7.5 7.5 0 0113 0" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    style={{ marginRight: 12 }}
  >
    <path d="M16 17l5-5-5-5M21 12H9M13 19H5a2 2 0 01-2-2V7a2 2 0 012-2h8" />
  </svg>
);

export default function TeacherDashboard() {
    const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [formData, setFormData] = useState({
    class: '',
    subject: '',
    topic: '',
    date: '',
     description: '', 
  });
  const [selectedNote, setSelectedNote] = useState(null);
const [isViewOpen, setIsViewOpen] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('/api/notes');
        setNotes(res.data.notes);
      } catch (err) {
        console.error('Error fetching notes:', err);
        alert('Failed to load notes.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) return <p>Loading...</p>;
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openAddModal = () => {
    setFormData({ class: '', subject: '', topic: '', date: '' });
    setIsAddOpen(true);
  };

const handleAddNote= async (e) => {
  e.preventDefault();
  const { class: className, subject, topic, date, teacherName,description } = formData;

  if (!className || !subject || !topic || !date ) {
    alert('Please fill all fields');
    return;
  }

  try {
    const res = await fetch('/api/notes/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ class: className, subject, topic, date, teacherName,description }),
    });

    const data = await res.json();

    if (res.ok) {
      setNotes((prev) => [...prev, data.note]);
      setIsAddOpen(false);
    } else {
      alert(data.message || 'Failed to add note');
    }
  } catch (error) {
    console.error(error);
    alert('Something went wrong');
  }
};


  const openEditModal = (note) => {
    setEditNote(note);
    setFormData({
      class: note.class,
      subject: note.subject,
      topic: note.topic,
      date: note.date,
      description:note.description
    });
    setIsEditOpen(true);
  };

 const handleEditNote = async (e) => {
  e.preventDefault();

  if (!formData.class || !formData.subject || !formData.topic || !formData.date) {
    alert('Please fill all fields');
    return;
  }

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  if (!userId) {
    alert('User ID not found. Please log in again.');
    return;
  }

  try {
    const res = await fetch('/api/notes/add', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editNote._id,
        class: formData.class,
        subject: formData.subject,
        topic: formData.topic,
        date: formData.date,
        teacherName: formData.teacherName,
        userId: userId, 
        description:formData.description
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Failed to update note');
      return;
    }

    setNotes((prev) =>
      prev.map((n) => (n.id === editNote._id ? data.note : n))
    );

    setIsEditOpen(false);
    setEditNote(null);
  } catch (error) {
    console.error('Error updating note:', error);
    alert('Something went wrong. Please try again.');
  }
};

const handleviewmore = (note) => {
  setSelectedNote(note);
  setIsViewOpen(true);
};

const handleDeleteNote = async (id) => {
  if (!confirm('Are you sure you want to delete this note?')) return;

  try {
    const res = await fetch('/api/notes/add', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Failed to delete note');
      return;
    }

    // setNotes((prev) => prev.filter((n) => n.id !== id));
    setNotes((prev)=>prev.filter((n)=>n._id!=id))
  } catch (error) {
    console.error('Error deleting note:', error);
    alert('Something went wrong. Please try again.');
  }
};


  const uniqueClasses = new Set(notes.map((n) => n.class)).size;
  const totalNotes = notes.length;
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const notesThisWeek = notes.filter(
    (n) => new Date(n.date) >= oneWeekAgo
  ).length;

  return (
    <>
      <Head>
        <title>Teacher Dashboard</title>
      </Head>

      <div className="dashboard-container">
        <aside className="sidebar">
          <h3>Teacher Journal</h3>
          <ul>
            <li className="active">
              <DashboardIcon />
              Dashboard
            </li>
            <li onClick={openAddModal} style={{ cursor: 'pointer' }}>
              <AddIcon />
              Add Lesson Note
            </li>
            {/* <li>
              <ClassesIcon />
              My Classes
            </li> */}
            <li onClick={()=>router.push("/teacher/profile")}>
              <ProfileIcon />
              Profile
            </li>
            <li className="logout">
              <LogoutIcon />
              Logout
            </li>
          </ul>
        </aside>

        <main className="dashboard-main">
          <h2>Welcome, Teacher 👋</h2>

          <div className="summary-cards">
            {/* <div className="card">
              <span className="card-label">Total Classes</span>
              <strong>{uniqueClasses}</strong>
            </div> */}
            <div className="card">
              <span className="card-label">Total Notes</span>
              <strong>{totalNotes}</strong>
            </div>
            <div className="card">
              <span className="card-label">Notes This Week</span>
              <strong>{notesThisWeek}</strong>
            </div>
          </div>

          <div className="note-section">
            <div className="note-header">
              <h3>Recent Lesson Notes</h3>
              <button className="add-note-btn" onClick={openAddModal}>
                + Add New Note
              </button>
            </div>
            {notes.length === 0 ? (
              <p className="empty-message">No notes available. Add some!</p>
            ) : (
              <table className="notes-table">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Subject</th>
                    <th>Topic</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {notes.map((note) => (
                    <tr key={note.id}>
                      <td>{note.class}</td>
                      <td>{note.subject}</td>
                      <td>{note.topic}</td>
                      <td>{note.date}</td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => openEditModal(note)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteNote(note._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="edit-btn"
                          onClick={() => handleviewmore(note)}
                        >
                          View More
                        </button>
                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>

      {isAddOpen && (
        <div className="modal-overlay" onClick={() => setIsAddOpen(false)}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h3 className='addlessonnotes'>Add Lesson Note</h3>
            <form onSubmit={handleAddNote}>
              <label>
                Class
                <input
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 6A"
                />
              </label>
              <label>
                Subject
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Math"
                />
              </label>
              <label>
                Topic
                <input
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Fractions"
                />
              </label>
              <label>
                Date
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
  Description
  <textarea
    name="description"
    value={formData.description}
    onChange={handleChange}
    required
    placeholder="Write a brief description..."
  />
</label>

              <div className="modal-buttons">
                <button type="submit" className="save-btn">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
{isViewOpen && selectedNote && (
  <div className="viewmore-overlay" onClick={() => setIsViewOpen(false)}>
    <div
      className="viewmore-modal"
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
    >
      <h3 className="viewmore-title">Lesson Note Details</h3>
      <ul className="viewmore-details">
        <li><strong>Class:</strong> {selectedNote.class}</li>
        <li><strong>Subject:</strong> {selectedNote.subject}</li>
        <li><strong>Topic:</strong> {selectedNote.topic}</li>
        <li><strong>Date:</strong> {selectedNote.date}</li>
        <li><strong>Teacher:</strong> {selectedNote.teacherName}</li>
        <li><strong>Description:</strong><br /> {selectedNote.description}</li>
      </ul>

      <button className="viewmore-close-btn" onClick={() => setIsViewOpen(false)}>
        Close
      </button>
    </div>
  </div>
)}

     {/* Edit Note Modal */}
{isEditOpen && (
  <div className="modal-overlay" onClick={() => setIsEditOpen(false)}>
    <div
      className="modal"
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
    >
      <h3>Edit Lesson Note</h3>
      <form onSubmit={handleEditNote}>
        <label>
          Class
          <input
            name="class"
            value={formData.class}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Subject
          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Topic
          <input
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter a description"
          />
        </label>

        <div className="modal-buttons">
          <button type="submit" className="save-btn">
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setIsEditOpen(false)}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      <style jsx>{`
        .viewmore-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.viewmore-modal {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.viewmore-title {
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.4rem;
  color: #222;
}

.viewmore-details {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1rem;
}

.viewmore-details li {
  margin-bottom: 0.75rem;
}

.viewmore-close-btn {
  background-color: #0070f3;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}

.viewmore-close-btn:hover {
  background-color: #005fcc;
}

        .dashboard-container {
          display: flex;
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f4f7ff;
          color: #333;
        }

        /* Sidebar */
        .sidebar {
          width: 260px;
          background: #3b49df;
          color: white;
          padding: 2.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          box-shadow: 3px 0 10px rgba(0, 0, 0, 0.1);
        }

        .sidebar h3 {
          margin-bottom: 3rem;
          font-size: 1.6rem;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-align: center;
          text-transform: uppercase;
          color: #f0f0f5;
          user-select: none;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        .sidebar ul {
          list-style: none;
          padding: 0;
          margin: 0;
          flex-grow: 1;
        }

        .sidebar li {
          display: flex;
          align-items: center;
          padding: 0.9rem 1.5rem;
          margin-bottom: 0.8rem;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          font-size: 1.05rem;
          transition: background-color 0.25s ease, box-shadow 0.25s ease;
          user-select: none;
          box-shadow: inset 0 0 0 transparent;
        }

        .sidebar li:hover {
          background-color: #5a6bf8;
          box-shadow: 0 4px 15px rgba(90, 107, 248, 0.45);
        }

        .sidebar .active {
          background-color: #2331a8;
          box-shadow: 0 4px 20px rgba(35, 49, 168, 0.75);
        }

        .sidebar .logout {
          margin-top: auto;
          color: #ff6b6b;
          font-weight: 700;
          transition: color 0.3s ease;
          user-select: none;
          display: flex;
          align-items: center;
        }

        .sidebar .logout:hover {
          color: #ff3b3b;
          text-shadow: 0 0 5px rgba(255, 59, 59, 0.6);
        }

        /* Main */
        .dashboard-main {
          flex: 1;
          padding: 3rem 3rem 4rem;
          overflow-y: auto;
        }

        .dashboard-main h2 {
          font-size: 2.4rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: #1a1a1a;
          user-select: none;
        }

        /* Cards */
        .summary-cards {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .card {
          flex: 1;
          background: white;
          padding: 2rem 2.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(59, 73, 223, 0.15);
          font-weight: 700;
          font-size: 1.25rem;
          color: #3b49df;
          display: flex;
          justify-content: space-between;
          align-items: center;
          user-select: none;
          letter-spacing: 0.04em;
          transition: box-shadow 0.3s ease;
        }
        .card:hover {
          box-shadow: 0 15px 30px rgba(59, 73, 223, 0.3);
        }
        .card-label {
          font-weight: 500;
          font-size: 1.1rem;
          color: #57606a;
        }

        /* Notes Section */
        .note-section {
          background: white;
          padding: 2rem 2.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 35px rgba(59, 73, 223, 0.12);
          user-select: none;
        }

        .note-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.8rem;
        }

        .note-header h3 {
          font-weight: 700;
          font-size: 1.8rem;
          color: #1a1a1a;
          user-select: none;
        }

        .add-note-btn {
          background: #3b49df;
          color: white;
          border: none;
          padding: 0.7rem 1.6rem;
          border-radius: 14px;
          cursor: pointer;
          font-weight: 700;
          font-size: 1.05rem;
          letter-spacing: 0.02em;
          box-shadow: 0 8px 20px rgba(59, 73, 223, 0.3);
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          user-select: none;
        }
        .add-note-btn:hover {
          background-color: #2c38b9;
          box-shadow: 0 12px 25px rgba(44, 56, 185, 0.5);
        }

        /* Table */
        .notes-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 10px;
          font-size: 1rem;
          user-select: text;
        }

        .notes-table thead tr th {
          text-align: left;
          padding: 12px 16px;
          font-weight: 700;
          color: #57606a;
          border-bottom: 2px solid #d1d5db;
          user-select: none;
        }

        .notes-table tbody tr {
          background: #f8fafc;
          box-shadow: 0 4px 15px rgba(59, 73, 223, 0.1);
          border-radius: 14px;
          transition: background-color 0.25s ease;
        }
        .notes-table tbody tr:hover {
          background-color: #e0e7ff;
          box-shadow: 0 8px 30px rgba(59, 73, 223, 0.15);
        }

        .notes-table tbody tr td {
          padding: 14px 16px;
          vertical-align: middle;
          color: #222;
        }

        .edit-btn,
        .delete-btn {
          padding: 0.4rem 1rem;
          border: none;
          border-radius: 14px;
          font-size: 0.9rem;
          cursor: pointer;
          margin-right: 0.6rem;
          font-weight: 600;
          transition: background-color 0.3s ease;
          user-select: none;
        }

        .edit-btn {
          background: #22c55e;
          color: white;
          box-shadow: 0 5px 15px rgba(34, 197, 94, 0.4);
        }
        .edit-btn:hover {
          background: #16a34a;
          box-shadow: 0 8px 20px rgba(22, 163, 74, 0.5);
        }

        .delete-btn {
          background: #ef4444;
          color: white;
          box-shadow: 0 5px 15px rgba(239, 68, 68, 0.4);
        }
        .delete-btn:hover {
          background: #b91c1c;
          box-shadow: 0 8px 20px rgba(185, 28, 28, 0.6);
        }

        .empty-message {
          text-align: center;
          font-style: italic;
          color: #94a3b8;
          padding: 2rem 0;
          user-select: none;
        }

        /* Modal Overlay */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.35);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          user-select: none;
        }

        /* Modal */
        .modal {
          background: white;
          padding: 2rem 2.5rem;
          border-radius: 20px;
          box-shadow: 0 15px 50px rgba(59, 73, 223, 0.4);
          width: 100%;
          max-width: 480px;
          user-select: text;
          animation: fadeInUp 0.3s ease forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Form Labels and Inputs */
        label {
          display: block;
          margin-bottom: 1rem;
          font-weight: 600;
          color: #334155;
          font-size: 1rem;
          user-select: none;
        }
        input {
          width: 100%;
          padding: 0.6rem 1rem;
          border: 2px solid #d1d5db;
          border-radius: 12px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
          box-sizing: border-box;
          user-select: text;
        }
        input:focus {
          outline: none;
          border-color: #3b49df;
          box-shadow: 0 0 8px rgba(59, 73, 223, 0.6);
        }

        /* Modal Buttons */
        .modal-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 1.25rem;
          margin-top: 1.8rem;
        }
        .save-btn {
          background: #3b49df;
          color: white;
          border: none;
          padding: 0.7rem 1.8rem;
          border-radius: 14px;
          cursor: pointer;
          font-weight: 700;
          font-size: 1rem;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          user-select: none;
          box-shadow: 0 8px 25px rgba(59, 73, 223, 0.5);
        }
        .save-btn:hover {
          background: #2c38b9;
          box-shadow: 0 10px 30px rgba(44, 56, 185, 0.6);
        }
        .cancel-btn {
          background: #e2e8f0;
          color: #475569;
          border: none;
          padding: 0.7rem 1.8rem;
          border-radius: 14px;
          cursor: pointer;
          font-weight: 700;
          font-size: 1rem;
          user-select: none;
          transition: background-color 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
        .cancel-btn:hover {
          background: #cbd5e1;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .dashboard-container {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
            flex-direction: row;
            padding: 1rem 1.5rem;
            justify-content: space-around;
          }
          .sidebar h3 {
            display: none;
          }
          .sidebar ul {
            display: flex;
            width: 100%;
            justify-content: space-around;
          }
          .sidebar li {
            margin-bottom: 0;
            padding: 0.6rem 0.8rem;
            font-size: 0.9rem;
          }
          .dashboard-main {
            padding: 2rem 1rem 3rem;
          }
          .summary-cards {
            flex-direction: column;
          }
          .card {
            font-size: 1.1rem;
            padding: 1.5rem 2rem;
          }
          }
textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  resize: vertical;
  min-height: 100px;
}
        
      `}</style>
    </>
  );
}
