const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

export async function fetchPosts() {
  const res = await fetch(`${API_BASE}/posts`);
  return res.json();
}

export async function fetchPost(id) {
  const res = await fetch(`${API_BASE}/posts/${id}`);
  return res.json();
}

export async function createPost(data) {
  const res = await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updatePost(id, data) {
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deletePost(id) {
  const res = await fetch(`${API_BASE}/posts/${id}`, { method: 'DELETE' });
  return res.json();
}
