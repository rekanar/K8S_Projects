import React, { useState, useEffect } from 'react';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const deptColors = {
  'Mathematics': ['#2563eb', '#1d4ed8'],
  'Physics': ['#7c3aed', '#6d28d9'],
  'Chemistry': ['#059669', '#047857'],
  'English': ['#dc2626', '#b91c1c'],
  'Biology': ['#0d9488', '#0f766e'],
  'Computer Science': ['#ea580c', '#c2410c'],
  'Hindi': ['#db2777', '#be185d'],
  'Social Studies': ['#7c3aed', '#5b21b6'],
  'Art & Craft': ['#d97706', '#b45309'],
  'Physical Education': ['#0891b2', '#0e7490'],
};

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/teachers`)
      .then(r => r.json())
      .then(data => { setTeachers(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading faculty...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>&#128105;&#8205;&#127979; Our Faculty</h1>
        <p>Dedicated educators nurturing future leaders</p>
        <div className="page-header-dots">
          <span /><span /><span />
        </div>
      </div>

      <section className="section">
        <div className="card-grid stagger">
          {teachers.map(t => {
            const colors = deptColors[t.department] || ['#2563eb', '#1d4ed8'];
            return (
              <div key={t.id} className="teacher-card fade-in">
                <div className="teacher-card-header" style={{
                  background: `linear-gradient(135deg, ${colors[0]}15, ${colors[1]}08)`,
                  borderBottom: `2px solid ${colors[0]}20`,
                }}>
                  <div className="teacher-avatar" style={{
                    background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
                  }}>
                    {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <h3 style={{ color: 'var(--navy)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px' }}>
                    {t.name}
                  </h3>
                  <span className="badge" style={{
                    background: `linear-gradient(135deg, ${colors[0]}20, ${colors[1]}15)`,
                    color: colors[0],
                  }}>{t.department}</span>
                </div>
                <div className="teacher-card-body">
                  <p><strong>Qualification:</strong> {t.qualification}</p>
                  <p><strong>Experience:</strong> {t.experience_years} years</p>
                  <p style={{ color: colors[0], fontSize: '0.85rem', marginTop: '8px', fontWeight: 500 }}>
                    &#9993; {t.email}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Teachers;
