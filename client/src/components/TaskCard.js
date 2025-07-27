import React, { useState } from 'react';


export default function TaskCard({ task, onDelete, onEdit, showActions = false }) {
    const [editing, setEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({
        title: task.title,
        description: task.description,
        status: task.status,
    });

    const handleEditChange = (e) => {
        setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (onEdit) {
            onEdit(task.id, editedTask);
            setEditing(false);
        }
    };

    return (
        <div className="task-card">
            {editing ? (
                <><form>
                    <input
                        name="title"
                        value={editedTask.title}
                        onChange={handleEditChange}
                        placeholder="Title"
                    />
                    <textarea
                        name="description"
                        value={editedTask.description}
                        onChange={handleEditChange}
                        placeholder="Description"
                    />
                    <select
                        name="status"
                        value={editedTask.status}
                        onChange={handleEditChange}
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <div className="actions">
                        <button onClick={handleSave}>💾 Save</button>
                        <button onClick={() => setEditing(false)}>❌ Cancel</button>
                    </div>
                </form>
                </>
            ) : (
                <>
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                    <p>Status: <strong>{task.status}</strong></p>
                    {task.userName && <p><i>User: {task.userName}</i></p>}
                    {showActions && (
                        <div className="actions">
                            <button onClick={() => setEditing(true)}>✏️ Edit</button>
                            <button onClick={() => onDelete(task.id)}>🗑️ Delete</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
