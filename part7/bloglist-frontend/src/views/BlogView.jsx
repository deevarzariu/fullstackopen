import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateBlog } from "../reducers/blogReducer";

const BlogView = () => {
  const { id } = useParams();
  const blogs = useSelector(state => state.blogs);
  const blog = blogs.find(blog => blog.id === id);
  const dispatch = useDispatch();

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

  if (!blog) return null;

  return <div>
    <h2>{blog.title} {blog.author}</h2>
    <a href={blog.url}>{blog.url}</a>
    <div>
      {blog.likes} likes
      <button onClick={handleLikeBlog}>like</button>
    </div>
    {blog.user && <div>added by {blog.user.name}</div>}
  </div>
}

export default BlogView;