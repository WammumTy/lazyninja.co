import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';

const BlogPosts: React.FC<{ profileId: number }> = ({ profileId }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get(`https://api.lazyninja.co/account/${profileId}/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data.posts || []);
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    if (profileId) {
      fetchPosts();
    }
  }, [profileId]);

  const handleDelete = async (postId: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await axios.delete(`https://api.lazyninja.co/account/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  if (loading) return <p>Loading posts...</p>;

  if (posts.length === 0) return <p className="italic text-gray-400">No blog posts yet.</p>;

  return (
    <div>
      <h3 className="font-semibold mb-4">Your Blog Posts</h3>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded shadow-sm">
            <h4 className="text-lg font-semibold">{post.title}</h4>
            <p className="text-gray-600">{post.content.slice(0, 100)}...</p>
            <div className="flex justify-between mt-2">
              <a
                href={`/blog/${post.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                Read more
              </a>
              <Button
                type="button"
                onClick={() => handleDelete(post.id)}
                className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1"
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPosts;
