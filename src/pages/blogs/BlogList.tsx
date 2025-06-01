import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('https://api.lazyninja.co/public/blog');
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      {loading && <p>Loading...</p>}
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 mb-4 rounded shadow">
          <div className="flex items-center mb-2">
            {post.profile_photo_url && (
              <img
                src={post.profile_photo_url}
                alt="Author"
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <span className="font-semibold">{post.business_name}</span>
          </div>
          <h2 className="text-lg font-bold">{post.title}</h2>
          <p className="text-gray-600">{post.content.slice(0, 100)}...</p>
          <NavLink
            to={`/blog/${post.id}`}
            className="text-blue-500 hover:underline mt-2 inline-block"
          >
            Read more
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
