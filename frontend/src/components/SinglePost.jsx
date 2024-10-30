
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const SinglePost = ({ token }) => {
  const { postId } = useParams(); // Get postId from the URL
  const [post, setPost] = useState(null);
  const [codeSnippets, setCodeSnippets] = useState({});
  
  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    const res = await fetch(`http://localhost:8000/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPost(data);
  };

  const toggleCodeSnippet = async (url, postId) => {
    if (codeSnippets[postId]) {
      // Hide the code snippet by setting it to null
      setCodeSnippets((prev) => ({ ...prev, [postId]: null }));
    } else {
      // Load the code snippet if it’s not already loaded
      try {
        const res = await fetch(url);
        const content = await res.text();
        setCodeSnippets((prev) => ({ ...prev, [postId]: content }));
      } catch (error) {
        console.error("Error fetching code snippet:", error);
      }
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold">{post.title}</h2>

      {post.codeSnippetUrl && (
        <>
          <button
            onClick={() => toggleCodeSnippet(post.codeSnippetUrl, post._id)}
            className="text-blue-500 mb-2"
          >
            {codeSnippets[post._id] ? "Hide Code Snippet" : "Load Code Snippet"}
          </button>

          {codeSnippets[post._id] && (
            <pre className="bg-gray-100 p-2 rounded">
              <code>{codeSnippets[post._id]}</code>
            </pre>
          )}
        </>
      )}
    </div>
  );
};

SinglePost.propTypes = {
  token: PropTypes.string.isRequired,
};

export default SinglePost;


