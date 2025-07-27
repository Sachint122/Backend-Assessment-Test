import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [form, setForm] = useState({ title: '', description: '', status: 'pending' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('createdAt:desc');
    const [page, setPage] = useState(1);
    const token = sessionStorage.getItem('token');
    const [status, setStatus] = useState('');
    const fetchTasks = async () => {
        try {
            const res = await axios.get('/tasks', {
                params: {
                    status,
                    search,
                    sort,
                    page,
                    limit: 10
                }
            });
            setTasks(res.data.tasks || []);
        } catch (err) {
            alert('Error fetching tasks');
        }
    };
    useEffect(() => {
        fetchTasks();
    }, [status, search, sort, page]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`/tasks/${editingId}`, form, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('Task updated!');
            } else {
                await axios.post('/tasks', form, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('Task created!');
            }

            setForm({ title: '', description: '', status: 'pending' });
            setIsEditing(false);
            setEditingId(null);
            fetchTasks();
        } catch (err) {
            alert('Error saving task');
        }
    };

    const handleEdit = (task) => {
        setForm({
            title: task.title,
            description: task.description,
            status: task.status
        });
        setIsEditing(true);
        setEditingId(task.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this task?')) return;
        try {
            await axios.delete(`/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTasks();
        } catch (err) {
            alert('Failed to delete');
        }
    };

    return (
        <div className="dashboard">
            <h2>{isEditing ? '✏️ Edit Task' : '📝 Your Tasks'}</h2>
            {isEditing && (
                <>
                    <p style={{ color: 'orange' }}>Editing Task #{editingId}</p>
                    <button onClick={() => {
                        setIsEditing(false);
                        setForm({ title: '', description: '', status: 'pending' });
                        setEditingId(null);
                    }}
                     className="btn cancel-btn"
                    >Cancel Edit</button>
                </>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Title"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <input
                    placeholder="Description"
                    required
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
                <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
            </form>
            <form>
                <div className="filters">
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>

                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="createdAt:desc">Newest First</option>
                        <option value="createdAt:asc">Oldest First</option>
                    </select>

                    <input
                        type="text"
                        placeholder="🔎 Search tasks"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </form>
            <ul style={{ marginTop: '30px' }}>
                {Array.isArray(tasks) && tasks.map((task) => (
                    <div key={task.id} className="task-card">
                        <h3>{task.title} <small>({task.status})</small></h3>
                        <p>{task.description}</p>
                        <button onClick={() => handleEdit(task)}>✏️ Edit</button>
                        <button onClick={() => handleDelete(task.id)}>❌ Delete</button>
                    </div>
                ))}
            </ul>
        </div>
    );
}
