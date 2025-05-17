import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Api from "../axiosConfig";
import { AuthContext } from "../context/auth.context";

function UserDashboard({ onLogout }) {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");

  const createPermissions = {
    SUPER_ADMIN: ["ADMIN"],
    ADMIN: ["UNIT_MANAGER"],
    UNIT_MANAGER: ["USER"],
    USER: [],
  };
  const { state, dispatch } = useContext(AuthContext);
  const fetchUsers = async () => {
    try {
      const response = await Api.get("/users/get-all-users");
      if (response?.data?.success) {
        setUsers(response.data.data);
      } else if (response?.data?.error) {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleCreate = async () => {
    try {
      console.log("role", role);
      const response = await Api.post("/user/create-user", {
        username,
        email,
        password,
        role,
        createdBy: state?.user?.role,
      });
      if (response?.data?.success) {
        toast.success(response.data.message);
        setUsername("");
        setEmail("");
        setPassword("");
        fetchUsers();
      } else if (response?.data?.error) {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Create user error:", error);
      toast.error("Failed to create user");
    }
  };
    const handleEdit = (user) => {
      setUsername(user.username);
      setEmail(user.email);
      setRole(user.role);
      // You can set a userBeingEdited state to control update logic
    };

    const handleDelete = async (userId) => {
      try {
        const confirm = window.confirm("Are you sure you want to delete this user?");
        if (!confirm) return;

        const response = await Api.delete(`/user/${userId}`);
        if (response.data.success) {
          toast.success("User deleted");
          fetchUsers();
        } else {
          toast.error(response.data.error || "Failed to delete user");
        }
      } catch (err) {
        toast.error("Error deleting user");
        console.error(err);
      }
    };

  const allowedRoles = createPermissions[state?.user?.role] || [];
  const canCreate = allowedRoles.length > 0;

  useEffect(() => {
    fetchUsers();
  }, [search]);

  useEffect(() => {
    if (state?.user?.role) {
      const allowedRoles = createPermissions[state.user.role] || [];
      if (allowedRoles.length > 0) {
        setRole((prevRole) =>
          allowedRoles.includes(prevRole) ? prevRole : allowedRoles[0]
        );
      } else {
        setRole("");
      }
    }
  }, [state?.user?.role]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {" "}
          Role : {state?.user?.role} &nbsp;&nbsp; Name : {state?.user?.username}
        </h2>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <div className="mb-4">
        <input
          className="border p-2 mr-2 rounded"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* <div className="mb-6 flex flex-wrap gap-2">
        <input className="border p-2 rounded" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-2 rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <select className="border p-2 rounded" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="ADMIN">Admin</option>
          <option value="UNIT_MANAGER">Unit Manager</option>
          <option value="USER">User</option>
        </select>
        <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
      </div> */}
      {canCreate && (
        <div className="mb-6 flex flex-wrap justify-center gap-3">
          <input
            className="border p-2 rounded"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="border p-2 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border p-2 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            className="border p-2 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {allowedRoles.map((r) => (
              <option key={r} value={r}>
                {r
                  .replace("_", " ")
                  .toLowerCase()
                  .replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
              </option>
            ))}
          </select>
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </div>
      )}

      {/* <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">User ID</th>
              <th className="p-2 border">Username</th>
              <th className="p-2 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="p-2 border">{user.userId}</td>
                <td className="p-2 border">{user.username}</td>
                <td className="p-2 border">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">User ID</th>
              <th className="p-2 border">Username</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="p-2 border">{user.userId}</td>
                <td className="p-2 border">{user.username}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserDashboard;
