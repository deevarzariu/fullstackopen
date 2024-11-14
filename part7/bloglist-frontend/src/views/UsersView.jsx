import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UsersView = () => {
  const users = useSelector(state => state.users)

  return <div>
    <h2>Users</h2>
    <table>
      <thead>
        <tr>
          <th></th>
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
    </table>
  </div>
}

export default UsersView;