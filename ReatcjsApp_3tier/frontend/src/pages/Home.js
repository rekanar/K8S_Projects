import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SchoolScene from '../components/SchoolScene';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function Home() {
  const [school, setSchool] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${API}/school`).then(r => r.json()).then(setSchool).catch(() => {});
    fetch(`${API}/announcements`).then(r => r.json()).then(setAnnouncements).catch(() => {});
    fetch(`${API}/events`).then(r => r.json()).then(setEvents).catch(() => {});
    fetch(`${API}/achievements`).then(r => r.json()).then(setAchievements).catch(() => {});
    fetch(`${API}/students/stats`).then(r => r.json()).then(setStats).catch(() => {});
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return { day: d.getDate(), month: d.toLocaleString('en', { month: 'short' }) };
  };

  return (
    <div>
      {/* Hero with animated sky */}
      <section className="hero">
        <div className="hero-sky">
          {/* Stars */}
          {Array.from({ length: 20 }, (_, i) => (
            <div key={`star-${i}`} className="star" style={{
              width: `${2 + Math.random() * 2}px`,
              height: `${2 + Math.random() * 2}px`,
              top: `${Math.random() * 30}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }} />
          ))}

          {/* Sun */}
          <div className="sun" />

          {/* Clouds */}
          <div className="cloud cloud-1" />
          <div className="cloud cloud-2" />
          <div className="cloud cloud-3" />

          {/* Birds */}
          <div className="bird bird-1" />
          <div className="bird bird-2" />
          <div className="bird bird-3" />
        </div>

        <div className="hero-content">
          <h1>{school?.name || 'Vignan School'}</h1>
          <p className="motto">"{school?.motto || 'Igniting Minds, Inspiring Futures'}"</p>
          <p className="established">
            Est. {school?.established_year || 1995} &bull; {school?.city || 'Hyderabad'}, {school?.state || 'Telangana'} &bull; {school?.board || 'CBSE'} & Cambridge
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="number">{stats?.total || '500'}+</span>
              <span className="label">Students</span>
            </div>
            <div className="hero-stat">
              <span className="number">50+</span>
              <span className="label">Faculty</span>
            </div>
            <div className="hero-stat">
              <span className="number">98.5%</span>
              <span className="label">Pass Rate</span>
            </div>
            <div className="hero-stat">
              <span className="number">30+</span>
              <span className="label">Years Legacy</span>
            </div>
          </div>
        </div>

        {/* Animated School Scene */}
        <SchoolScene />
      </section>

      {/* Quick Links */}
      <section className="section">
        <h2 className="section-title">Explore Our School</h2>
        <p className="section-subtitle">Discover what makes Vignan a center of excellence</p>
        <div className="section-title-bar">
          <span /><span /><span />
        </div>
        <div className="quick-links stagger">
          <Link to="/students" className="quick-link-card fade-in">
            <div className="icon">&#127891;</div>
            <h3>Students Portal</h3>
            <p>View student directory and class details</p>
          </Link>
          <Link to="/teachers" className="quick-link-card fade-in">
            <div className="icon">&#128105;&#8205;&#127979;</div>
            <h3>Our Faculty</h3>
            <p>Meet our experienced teaching staff</p>
          </Link>
          <Link to="/courses" className="quick-link-card fade-in">
            <div className="icon">&#128218;</div>
            <h3>Academics</h3>
            <p>Explore our CBSE & Cambridge curriculum</p>
          </Link>
          <Link to="/announcements" className="quick-link-card fade-in">
            <div className="icon">&#128227;</div>
            <h3>News & Events</h3>
            <p>Latest announcements and updates</p>
          </Link>
        </div>
      </section>

      {/* Latest Announcements */}
      <section className="section-alt">
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 20px' }}>
          <h2 className="section-title">Latest Announcements</h2>
          <p className="section-subtitle">Stay informed with the latest from Vignan</p>
          <div className="section-title-bar"><span /><span /><span /></div>
          <div className="stagger">
            {announcements.slice(0, 4).map((a) => (
              <div key={a.id} className={`announcement-card fade-in ${a.priority === 'high' ? 'high' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  <span className="date">{new Date(a.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {a.priority === 'high' && <span className="badge badge-red">Urgent</span>}
                    <span className="badge badge-purple">{a.category}</span>
                  </div>
                </div>
                <h3>{a.title}</h3>
                <p>{a.content}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <Link to="/announcements" style={{
              display: 'inline-block',
              padding: '12px 32px',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              color: 'white',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              boxShadow: '0 4px 15px rgba(37,99,235,0.3)',
              transition: 'all 0.3s ease',
            }}>
              View All Announcements &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section">
        <h2 className="section-title">Upcoming Events</h2>
        <p className="section-subtitle">Mark your calendars for exciting activities ahead</p>
        <div className="section-title-bar"><span /><span /><span /></div>
        <div className="events-list stagger">
          {events.slice(0, 5).map((e) => {
            const d = formatDate(e.event_date);
            return (
              <div key={e.id} className="event-card fade-in">
                <div className="event-date-box">
                  <span className="day">{d.day}</span>
                  <span className="month">{d.month}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: 'var(--navy)', fontSize: '1.05rem', marginBottom: '4px', fontWeight: 700 }}>{e.title}</h3>
                  <p style={{ color: 'var(--gray-600)', fontSize: '0.85rem', marginBottom: '4px' }}>{e.description}</p>
                  <p style={{ color: 'var(--gray-400)', fontSize: '0.8rem' }}>
                    {e.location !== 'N/A' && <span>&#128205; {e.location}</span>}
                    {' '}<span className="badge badge-gold">{e.category}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Achievements */}
      <section className="section-warm">
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 20px' }}>
          <h2 className="section-title">Achievements & Awards</h2>
          <p className="section-subtitle">Our students shine on every stage</p>
          <div className="section-title-bar"><span /><span /><span /></div>
          <div className="card-grid stagger">
            {achievements.slice(0, 6).map((a) => (
              <div key={a.id} className="achievement-card fade-in">
                <span className={`badge ${a.category === 'Academic' ? 'badge-blue' : a.category === 'Sports' ? 'badge-green' : a.category === 'Environment' ? 'badge-green' : 'badge-gold'}`}>
                  {a.category}
                </span>
                <h3 style={{ marginTop: '12px' }}>{a.title}</h3>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.85rem', margin: '8px 0' }}>{a.description}</p>
                <span className="student">{a.student_name}</span> &middot; <span className="year">{a.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
