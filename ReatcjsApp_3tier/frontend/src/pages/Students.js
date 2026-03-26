import React, { useState, useEffect } from 'react';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function Students() {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    Promise.all([
      fetch(`${API}/students`).then(r => r.json()),
      fetch(`${API}/students/stats`).then(r => r.json()),
    ]).then(([s, st]) => {
      setStudents(s);
      setStats(st);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? students : students.filter(s => s.class === filter);
  const classes = [...new Set(students.map(s => s.class))].sort((a, b) => Number(a) - Number(b));

  if (loading) return <div className="loading">Loading students...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>&#127891; Students Directory</h1>
        <p>Our bright minds shaping the future</p>
        <div className="page-header-dots">
          <span /><span /><span />
        </div>
      </div>

      {stats && (
        <div className="stats-bar">
          <div className="stat-item">
            <div className="value">{stats.total}</div>
            <div className="label">Total Students</div>
          </div>
          {stats.byClass?.map(c => (
            <div key={c.class} className="stat-item">
              <div className="value">{c.count}</div>
              <div className="label">Class {c.class}</div>
            </div>
          ))}
        </div>
      )}

      <section className="section">
        <div className="filter-bar">
          <button
            onClick={() => setFilter('all')}
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          >All Classes</button>
          {classes.map(c => (
            <button key={c}
              onClick={() => setFilter(c)}
              className={`filter-btn ${filter === c ? 'active' : ''}`}
            >Class {c}</button>
          ))}
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Class</th>
                <th>Section</th>
                <th>Parent</th>
                <th>Admission Year</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td><span className="badge badge-blue">{s.roll_number}</span></td>
                  <td style={{ fontWeight: 700, color: 'var(--navy)' }}>{s.name}</td>
                  <td><span className="badge badge-purple">Class {s.class}</span></td>
                  <td style={{ fontWeight: 600 }}>{s.section}</td>
                  <td>{s.parent_name}</td>
                  <td><span className="badge badge-gold">{s.admission_year}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ textAlign: 'center', marginTop: '16px', color: 'var(--gray-400)', fontSize: '0.85rem' }}>
          Showing {filtered.length} of {students.length} students
        </p>
      </section>
    </div>
  );
}

export default Students;
