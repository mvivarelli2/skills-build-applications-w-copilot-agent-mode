import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://0.0.0.0:8000';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `${API_BASE}/api/users/`;
    console.log('Users: fetching from', url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('Users: fetched data', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Users: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card page-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2>👤 Users</h2>
        {!loading && !error && (
          <span className="badge bg-light text-dark badge-count">{users.length} users</span>
        )}
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger m-3">Error loading users: {error}</div>}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr><td colSpan="3" className="text-center text-muted py-4">No users found.</td></tr>
                ) : (
                  users.map((user, idx) => (
                    <tr key={user._id || idx}>
                      <td>{idx + 1}</td>
                      <td className="fw-semibold">{user.username}</td>
                      <td><a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
