import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function Home() {
  const sections = [
    { to: '/users', icon: '👤', label: 'Users', desc: 'Manage athlete profiles' },
    { to: '/activities', icon: '🏃', label: 'Activities', desc: 'Track logged activities' },
    { to: '/teams', icon: '🤝', label: 'Teams', desc: 'View and manage teams' },
    { to: '/leaderboard', icon: '🏆', label: 'Leaderboard', desc: 'See top performers' },
    { to: '/workouts', icon: '💪', label: 'Workouts', desc: 'Browse workout plans' },
  ];
  return (
    <>
      <div className="hero-section">
        <h1>🐙 OctoFit Tracker</h1>
        <p className="mb-0">Your all-in-one fitness tracking platform</p>
      </div>
      <div className="row g-3">
        {sections.map((s) => (
          <div className="col-sm-6 col-lg-4" key={s.to}>
            <Link to={s.to} className="summary-card card p-3">
              <div className="d-flex align-items-center gap-3">
                <span style={{ fontSize: '2rem' }}>{s.icon}</span>
                <div>
                  <h5 className="mb-0 fw-semibold">{s.label}</h5>
                  <small className="text-muted">{s.desc}</small>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

function App() {
  const navItems = [
    { to: '/users', label: 'Users' },
    { to: '/activities', label: 'Activities' },
    { to: '/teams', label: 'Teams' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/workouts', label: 'Workouts' },
  ];

  return (
    <Router>
      <nav className="navbar navbar-expand-lg octofit-navbar">
        <div className="container">
          <NavLink className="navbar-brand" to="/">🐙 OctoFit Tracker</NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {navItems.map((item) => (
                <li className="nav-item" key={item.to}>
                  <NavLink
                    className={({ isActive }) =>
                      'nav-link' + (isActive ? ' active' : '')
                    }
                    to={item.to}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
