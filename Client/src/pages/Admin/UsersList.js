import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../axiosAPI/Users.js';

export default function UsersList() {
  const [usersData, setUsersData] = useState([]); // State to store the fetched users

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getAllUsers(); // Wait for the Promise to resolve
        setUsersData(userData); // Update the state with the fetched data
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers(); // Call the function to fetch users when the component mounts
  }, []);

  return (
    <div className='bg-light'>
            <div className='container py-5'>
                <h2 className="mb-3 text-center">Users list</h2>
                <div className="row g-2 mb-5">
                  <ul className="navbar-nav justify-content-end flex-grow-1">
                    <li className="nav-item" style={{ marginTop: 20 }}>
                      <div className="rounded border shadow p-4 text-center h-100">
                        <table className="table">
                          <thead>
                            <tr>
                              <th className="center-cell">User name</th>
                              <th className="center-cell">User lastname</th>
                              <th className="center-cell">User email</th>
                              <th className="center-cell">User phone</th>
                            </tr>
                          </thead>
                          <tbody>
                            {usersData.map((user) => (
                              <tr key={user._id}>
                                <td className="center-cell">
                                  {user.userType === "Admin" ? `${user.name} (Admin)` : user.name}
                                </td>
                                <td className="center-cell">{user.lastname}</td>
                                <td className="center-cell">{user.email}</td>
                                <td className="center-cell">{user.phone}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </li>
                  </ul>
                </div>
            </div>
        </div>
  );
}