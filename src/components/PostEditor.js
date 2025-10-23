import React, { useEffect, useState } from 'react';
import { fetchPost } from '../api';

export default function PostEditor({ postId = null, onCancel, onSave }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (postId) {
        setLoading(true);
        const p = await fetchPost(postId);
        if (!cancelled) {
          setTitle(p.title);
          setBody(p.body);
          setLoading(false);
        }
      } else {
        setTitle('');
        setBody('');
      }
    })();
    return () => { cancelled = true; };
  }, [postId]);

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      alert('Title and body required');
      return;
    }
    await onSave({ title: title.trim(), body: body.trim() });
  };

  return (
    <form onSubmit={submit}>
      <div>
        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 6 }} />
      </div>
      <div style={{ marginTop: 12 }}>
        <label>Body</label>
        <textarea value={body} onChange={e => setBody(e.target.value)} rows={12} style={{ width: '100%', padding: 8, marginTop: 6 }} />
      </div>

      <div style={{ marginTop: 12 }}>
        <button type="submit" disabled={loading} style={{ marginRight: 8 }}>{postId ? 'Save' : 'Create'}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
