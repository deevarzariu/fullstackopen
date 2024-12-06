import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";

const UsersView = () => {
  const users = useSelector(state => state.users)

  return <div>
    <h2>Users</h2>
    <Table>
      <thead>
        <tr>
          <th>name</th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => <tr key={user.name}>
          <td>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </td>
          <td>{user.blogs.length}</td>
        </tr>)}
      </tbody>
    </Table>
  </div>
}

export default UsersView;