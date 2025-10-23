import React from 'react';

export default function PostList({ posts = [], onSelect, selectedId, onDelete, onEdit }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {posts.map(p => (
        <li key={p.id} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ cursor: 'pointer' }} onClick={() => onSelect(p.id)}>
              <strong>{p.title}</strong>
              <div style={{ fontSize: 12, color: '#666' }}>{new Date(p.created_at).toLocaleString()}</div>
            </div>
            <div>
              <button onClick={() => onEdit(p.id)} style={{ marginRight: 8 }}>Edit</button>
              <button onClick={() => onDelete(p.id)}>Delete</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
