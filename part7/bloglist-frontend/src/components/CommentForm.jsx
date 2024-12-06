import { useState } from "react"
import { Button, Form } from "react-bootstrap";

const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(comment);
    setComment("");
  }

  return <Form onSubmit={handleSubmit}>
    <Form.Control type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
    <Button className="mt-2" type="submit">add commment</Button>
  </Form>

}

export default CommentForm