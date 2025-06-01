import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`https://api.lazyninja.co/public/blog/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [postId]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
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
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-700">{post.content}</p>
    </div>
  );
};

export default BlogPost;
