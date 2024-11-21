import { useState } from "react"

const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(comment);
    setComment("");
  }

  return <form onSubmit={handleSubmit}>
    <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
    <input type="submit" value="add comment" />
  </form>

}

export default CommentForm