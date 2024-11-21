import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
    <div>
      {blog.likes} likes
      <button onClick={handleLikeBlog}>like</button>
    </div>
    {blog.user && <div>added by {blog.user.name}</div>}
    <div>
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