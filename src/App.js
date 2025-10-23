import React, { useEffect, useState } from 'react';
import { fetchPosts, createPost, updatePost, deletePost, fetchPost } from './api';
import PostList from './components/PostList';
import PostView from './components/PostView';
import PostEditor from './components/PostEditor';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(null); // id
  const [editing, setEditing] = useState(null); // id or null
  const [loading, setLoading] = useState(false);

  async function loadPosts() {
    setLoading(true);
    const data = await fetchPosts();
    setPosts(data);
    setLoading(false);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  const onCreate = async (post) => {
    const created = await createPost(post);
    await loadPosts();
    setSelected(created.id);
    setEditing(null);
  };

  const onEdit = async (id, post) => {
    await updatePost(id, post);
    await loadPosts();
    setEditing(null);
    setSelected(id);
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    await deletePost(id);
    await loadPosts();
    setSelected(null);
  };

  const openForEdit = async (id) => {
    setEditing(id);
    const p = await fetchPost(id);
    setSelected(id);
  };

  return (
    <div style={{ maxWidth: 900, margin: '24px auto', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>My Blog</h1>
        <button onClick={() => { setEditing('new'); setSelected(null); }}>New Post</button>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20, marginTop: 20 }}>
        <aside style={{ borderRight: '1px solid #ddd', paddingRight: 12 }}>
          <h2>Posts</h2>
          {loading ? <div>Loading…</div> : (
            <PostList posts={posts} onSelect={setSelected} selectedId={selected} onDelete={onDelete} onEdit={openForEdit} />
          )}
        </aside>

        <section style={{ paddingLeft: 12 }}>
          {editing ? (
            <PostEditor
              key={editing}
              postId={editing === 'new' ? null : editing}
              onCancel={() => setEditing(null)}
              onSave={async (data) => {
                if (editing === 'new') await onCreate(data); else await onEdit(editing, data);
              }}
            />
          ) : selected ? (
            <PostView postId={selected} onEdit={() => openForEdit(selected)} onDelete={() => onDelete(selected)} />
          ) : (
            <div>Select a post or create a new one.</div>
          )}
        </section>
      </main>
    </div>
  );
}
