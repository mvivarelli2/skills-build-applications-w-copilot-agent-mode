import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://0.0.0.0:8000';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `${API_BASE}/api/teams/`;
    console.log('Teams: fetching from', url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('Teams: fetched data', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card page-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2>🤝 Teams</h2>
        {!loading && !error && (
          <span className="badge bg-light text-dark badge-count">{teams.length} teams</span>
        )}
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger m-3">Error loading teams: {error}</div>}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status">
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
                  <th>Team Name</th>
                  <th>Members</th>
                </tr>
              </thead>
              <tbody>
                {teams.length === 0 ? (
                  <tr><td colSpan="3" className="text-center text-muted py-4">No teams found.</td></tr>
                ) : (
                  teams.map((team, idx) => {
                    const members = Array.isArray(team.members) ? team.members : [];
                    return (
                      <tr key={team._id || idx}>
                        <td>{idx + 1}</td>
                        <td className="fw-semibold">{team.name}</td>
                        <td>
                          {members.length > 0
                            ? members.map((m, i) => (
                                <span key={i} className="badge bg-secondary me-1">{m}</span>
                              ))
                            : <span className="text-muted">No members</span>}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
