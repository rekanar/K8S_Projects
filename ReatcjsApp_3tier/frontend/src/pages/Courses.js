import React, { useState, useEffect } from 'react';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const subjectMeta = {
  'Mathematics': { icon: '&#128290;', color: '#2563eb' },
  'Physics': { icon: '&#9883;', color: '#7c3aed' },
  'Chemistry': { icon: '&#129514;', color: '#059669' },
  'English': { icon: '&#128214;', color: '#dc2626' },
  'Biology': { icon: '&#129516;', color: '#0d9488' },
  'Computer Science': { icon: '&#128187;', color: '#ea580c' },
  'Hindi': { icon: '&#128220;', color: '#db2777' },
  'Social Studies': { icon: '&#127758;', color: '#7c3aed' },
  'Art & Craft': { icon: '&#127912;', color: '#d97706' },
  'Physical Education': { icon: '&#9917;', color: '#0891b2' },
};

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/courses`)
      .then(r => r.json())
      .then(data => { setCourses(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading courses...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>&#128218; Academic Courses</h1>
        <p>CBSE & Cambridge curriculum for holistic education</p>
        <div className="page-header-dots">
          <span /><span /><span />
        </div>
      </div>

      <section className="section">
        <div className="card-grid stagger">
          {courses.map(c => {
            const meta = subjectMeta[c.name] || { icon: '&#128218;', color: '#2563eb' };
            return (
              <div key={c.id} className="card fade-in" style={{ borderTop: `4px solid ${meta.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    background: `${meta.color}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}>
                    <span dangerouslySetInnerHTML={{ __html: meta.icon }} />
                  </div>
                  <span className="badge badge-gold">{c.code}</span>
                </div>
                <h3>{c.name}</h3>
                <p style={{ marginBottom: '12px' }}>{c.description}</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span className="badge badge-blue">Class {c.class}</span>
                  <span className="badge badge-purple">{c.credits} Credits</span>
                </div>
                <div style={{
                  marginTop: '14px', paddingTop: '14px',
                  borderTop: '1px solid var(--gray-200)',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: `${meta.color}20`, color: meta.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 700,
                  }}>
                    {(c.teacher_name || 'T').split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--gray-600)', fontWeight: 500 }}>
                    {c.teacher_name || 'TBA'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Courses;
