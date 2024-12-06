import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { addComment, updateBlog } from "../reducers/blogReducer";
import CommentForm from "../components/CommentForm";

const BlogView = () => {
  const { id } = useParams();
  const blogs = useSelector(state => state.blogs);
  const blog = blogs.find(blog => blog.id === id);
  const dispatch = useDispatch();

  if (!blog) return null;

  const handleLikeBlog = async () => {
    try {
      await updateBlog(dispatch, {
        ...blog,
        likes: blog.likes + 1,
      });
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleAddComment = async (comment) => {
    try {
      await addComment(dispatch, id, comment);
    } catch (err) {
      console.log(err.response);
    }
  }

  return <div>
    <h2>{blog.title} {blog.author}</h2>
    <a href={blog.url}>{blog.url}</a>
    <div className="d-flex align-items-center mt-1">
      {blog.likes} likes
      <Button className="ms-1" size="sm" onClick={handleLikeBlog}>like</Button>
    </div>
    {blog.user && <div>added by {blog.user.name}</div>}
    <div className="mt-2">
      <h3>comments</h3>
      <CommentForm onSubmit={handleAddComment} />
      {blog.comments &&
        <ul>{blog.comments.map((comment, index) =>
          <li key={index}>{comment}</li>
        )}
        </ul>
      }
    </div>
  </div>
}

export default BlogView;