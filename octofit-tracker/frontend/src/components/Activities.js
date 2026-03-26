import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://0.0.0.0:8000';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `${API_BASE}/api/activities/`;
    console.log('Activities: fetching from', url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('Activities: fetched data', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Activities: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card page-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2>🏃 Activities</h2>
        {!loading && !error && (
          <span className="badge bg-light text-dark badge-count">{activities.length} records</span>
        )}
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger m-3">Error loading activities: {error}</div>}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
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
                  <th>User</th>
                  <th>Activity Type</th>
                  <th>Duration (min)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.length === 0 ? (
                  <tr><td colSpan="5" className="text-center text-muted py-4">No activities found.</td></tr>
                ) : (
                  activities.map((activity, idx) => (
                    <tr key={activity._id || idx}>
                      <td>{idx + 1}</td>
                      <td>{activity.user}</td>
                      <td><span className="badge bg-primary">{activity.activity_type}</span></td>
                      <td>{activity.duration}</td>
                      <td>{activity.date}</td>
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

export default Activities;
