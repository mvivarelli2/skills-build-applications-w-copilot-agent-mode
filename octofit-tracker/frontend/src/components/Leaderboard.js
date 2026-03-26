import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://0.0.0.0:8000';

const MEDALS = ['🥇', '🥈', '🥉'];

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `${API_BASE}/api/leaderboard/`;
    console.log('Leaderboard: fetching from', url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('Leaderboard: fetched data', data);
        setEntries(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card page-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2>🏆 Leaderboard</h2>
        {!loading && !error && (
          <span className="badge bg-light text-dark badge-count">{entries.length} athletes</span>
        )}
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger m-3">Error loading leaderboard: {error}</div>}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Username</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 ? (
                  <tr><td colSpan="3" className="text-center text-muted py-4">No entries found.</td></tr>
                ) : (
                  entries.map((entry, idx) => (
                    <tr key={entry._id || idx} className={idx === 0 ? 'table-warning fw-bold' : ''}>
                      <td>{MEDALS[idx] || idx + 1}</td>
                      <td>{entry.username}</td>
                      <td><span className="badge bg-success">{entry.score}</span></td>
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

export default Leaderboard;
