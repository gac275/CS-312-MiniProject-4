import React, { useEffect, useState } from 'react';
import { fetchPost } from '../api';

export default function PostView({ postId, onEdit, onDelete }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await fetchPost(postId);
      if (!cancelled) setPost(data);
    })();
    return () => { cancelled = true; };
  }, [postId]);

  if (!post) return <div>Loading post…</div>;

  return (
    <article>
      <h2>{post.title}</h2>
      <div style={{ color: '#777', fontSize: 12 }}>
        Created: {new Date(post.created_at).toLocaleString()} • Updated: {new Date(post.updated_at).toLocaleString()}
      </div>
      <div style={{ marginTop: 12, whiteSpace: 'pre-wrap' }}>{post.body}</div>
      <div style={{ marginTop: 20 }}>
        <button onClick={onEdit} style={{ marginRight: 8 }}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </article>
  );
}
