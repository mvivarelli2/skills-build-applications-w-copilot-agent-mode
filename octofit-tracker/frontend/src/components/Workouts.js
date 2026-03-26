import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://0.0.0.0:8000';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `${API_BASE}/api/workouts/`;
    console.log('Workouts: fetching from', url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('Workouts: fetched data', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Workouts: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card page-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2>💪 Workouts</h2>
        {!loading && !error && (
          <span className="badge bg-light text-dark badge-count">{workouts.length} workouts</span>
        )}
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger m-3">Error loading workouts: {error}</div>}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
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
                  <th>Workout Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {workouts.length === 0 ? (
                  <tr><td colSpan="3" className="text-center text-muted py-4">No workouts found.</td></tr>
                ) : (
                  workouts.map((workout, idx) => (
                    <tr key={workout._id || idx}>
                      <td>{idx + 1}</td>
                      <td className="fw-semibold">{workout.name}</td>
                      <td>{workout.description}</td>
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

export default Workouts;
