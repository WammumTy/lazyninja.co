import React from 'react';

const PostsViewer: React.FC = () => (
  <div className="mt-8 p-4 border rounded shadow bg-white">
    <h3 className="text-xl font-bold mb-2">Your Posts</h3>
    {/* Replace with your real posts logic */}
    <p className="text-gray-600">You haven’t posted anything yet. Start sharing your work!</p>
  </div>
);

export default PostsViewer;
