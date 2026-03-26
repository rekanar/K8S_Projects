import React, { useState, useEffect } from 'react';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/announcements`).then(r => r.json()),
      fetch(`${API}/events`).then(r => r.json()),
    ]).then(([a, e]) => {
      setAnnouncements(a);
      setEvents(e);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return {
      day: d.getDate(),
      month: d.toLocaleString('en', { month: 'short' }),
      full: d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
    };
  };

  if (loading) return <div className="loading">Loading announcements...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>&#128227; News & Announcements</h1>
        <p>Stay updated with the latest from Vignan School</p>
        <div className="page-header-dots">
          <span /><span /><span />
        </div>
      </div>

      <section className="section">
        <h2 className="section-title">Announcements</h2>
        <div className="section-title-bar"><span /><span /><span /></div>
        <div className="stagger">
          {announcements.map(a => (
            <div key={a.id} className={`announcement-card fade-in ${a.priority === 'high' ? 'high' : ''}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                <span className="date">{formatDate(a.date).full}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span className={`badge ${a.priority === 'high' ? 'badge-red' : 'badge-green'}`}>{a.priority}</span>
                  <span className="badge badge-purple">{a.category}</span>
                </div>
              </div>
              <h3>{a.title}</h3>
              <p>{a.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-alt">
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 20px' }}>
          <h2 className="section-title">Upcoming Events</h2>
          <div className="section-title-bar"><span /><span /><span /></div>
          <div className="events-list stagger">
            {events.map(e => {
              const d = formatDate(e.event_date);
              return (
                <div key={e.id} className="event-card fade-in">
                  <div className="event-date-box">
                    <span className="day">{d.day}</span>
                    <span className="month">{d.month}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ color: 'var(--navy)', fontSize: '1.05rem', marginBottom: '4px', fontWeight: 700 }}>{e.title}</h3>
                    <p style={{ color: 'var(--gray-600)', fontSize: '0.88rem', marginBottom: '6px' }}>{e.description}</p>
                    <p style={{ color: 'var(--gray-400)', fontSize: '0.82rem' }}>
                      {e.location !== 'N/A' && <span>&#128205; {e.location} &bull; </span>}
                      <span className="badge badge-gold">{e.category}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Announcements;
