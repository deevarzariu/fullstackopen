import { useState } from "react";
import PropTypes from "prop-types";
import { Table, Form, Button } from 'react-bootstrap'

const BlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="title">Title</Form.Label>
        <Form.Control
          type="text"
          id="title"
          name="title"
          data-testid="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="author">Author</Form.Label>
        <Form.Control
          type="text"
          id="author"
          name="author"
          data-testid="author"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="url">URL</Form.Label>
        <Form.Control
          type="text"
          id="url"
          name="url"
          data-testid="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
      </Form.Group>
      <Button variant="primary" className="mt-3" type="submit" id="createBtn">
        create
      </Button>
    </Form>
  );
};

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default BlogForm;
