import React, { useEffect, useState } from 'react';
import API from '../utils/axios';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [editId, setEditId] = useState(null);

  const fetchNotes = async () => {
    const res = await API.get('/notes');
    setNotes(res.data);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/notes/${editId}`, form);
    } else {
      await API.post('/notes', form);
    }
    setForm({ title: '', content: '' });
    setEditId(null);
    fetchNotes();
  };

  const handleEdit = (note) => {
    setForm({ title: note.title, content: note.content });
    setEditId(note._id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/notes/${id}`);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Your Notes</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <input
            name="title"
            className="form-control"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <textarea
            name="content"
            className="form-control"
            placeholder="Content"
            value={form.content}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-success w-100">{editId ? 'Update Note' : 'Add Note'}</button>
      </form>

      <div className="row">
        {notes.map((note) => (
          <div className="col-md-4 mb-3" key={note._id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.content}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(note)}>Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(note._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
