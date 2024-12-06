import { Button, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = ({ user, onLogout }) => {
  return <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto align-items-center">
        <Nav.Link href="#" as="span">
          <Link to="/">blogs</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link to="/users">users</Link>
        </Nav.Link>
        <Nav.Link className="d-flex align-items-center py-1" href="#" as="span">
          {user.name} logged in.
          <Button variant="primary" className="ms-2" onClick={onLogout}>logout</Button>
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
}

export default Navigation;