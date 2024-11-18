import { Link } from "react-router-dom";

const styles = {
  navbar: {
    background: "lightgrey",
    padding: "5px 10px",
  },
  link: {
    marginRight: "7px"
  }
}

const Navbar = ({ user, onLogout }) => {
  return <div style={styles.navbar}>
    <Link style={styles.link} to="/">blogs</Link>
    <Link style={styles.link} to="/users">users</Link>
    <span>
      {user.name} logged in.
      <button onClick={onLogout}>logout</button>
    </span>
  </div>
}

export default Navbar;