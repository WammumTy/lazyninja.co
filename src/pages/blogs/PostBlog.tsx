import React, { useState } from 'react';
import axios from 'axios';

const PostBlog: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://api.lazyninja.co/blog',
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('Blog post created!');
      setTitle('');
      setContent('');
    } catch (err: any) {
      console.error(err);
      setMessage('Error posting blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Post a Blog</h1>
      <form onSubmit={handlePost} className="space-y-4 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full border border-gray-300 p-2 rounded"
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
        {message && <p className="text-green-600">{message}</p>}
      </form>
    </div>
  );
};

export default PostBlog;
