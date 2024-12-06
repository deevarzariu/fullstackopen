import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";



const Blog = ({ blog, user, onLike, onRemove }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="border py-2 px-3">
      <div data-testid="blog-heading" className="d-flex justify-content-between align-items-center w-full">
        <Link key={blog.id} to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
        <Button variant="secondary" onClick={toggleShowDetails}>
          {showDetails ? "hide" : "show"}
        </Button>
      </div>
      <div
        className="blog-details"
        style={showDetails ? null : { display: "none" }}
      >
        <div>{blog.url}</div>
        <div data-testid="likes" className="d-flex mt-1 align-items-center">
          likes {blog.likes}
          <Button size="sm" className="ms-1" onClick={() => onLike(blog)}>like</Button>
        </div>
        {blog.user && <div>added by {blog.user.name}</div>}
        {blog.user && user.username === blog.user.username && (
          <button onClick={() => onRemove(blog)}>remove</button>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
    user: PropTypes.object,
  }),
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }),
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Blog;
