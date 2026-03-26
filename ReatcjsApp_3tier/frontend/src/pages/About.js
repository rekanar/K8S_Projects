import React, { useState, useEffect } from 'react';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function About() {
  const [school, setSchool] = useState(null);

  useEffect(() => {
    fetch(`${API}/school`).then(r => r.json()).then(setSchool).catch(() => {});
  }, []);

  return (
    <div>
      <div className="about-hero">
        <h1>About Vignan School</h1>
        <p>{school?.description || 'Vignan School, established in 1995, is one of the premier educational institutions in Hyderabad, dedicated to nurturing future leaders through excellence in academics, sports, and character building.'}</p>
        <div className="page-header-dots" style={{ marginTop: '20px' }}>
          <span /><span /><span />
        </div>
      </div>

      <section className="section">
        <h2 className="section-title">School at a Glance</h2>
        <div className="section-title-bar"><span /><span /><span /></div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginBottom: '40px',
        }}>
          {[
            { label: 'Established', value: school?.established_year || 1995, color: '#2563eb' },
            { label: 'Campus', value: '15 Acres', color: '#059669' },
            { label: 'Students', value: '500+', color: '#7c3aed' },
            { label: 'Faculty', value: '50+', color: '#ea580c' },
            { label: 'Pass Rate', value: '98.5%', color: '#db2777' },
            { label: 'Board', value: 'CBSE', color: '#0891b2' },
          ].map((s, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--gray-200)',
              borderBottom: `4px solid ${s.color}`,
              transition: 'all 0.3s ease',
            }}>
              <div style={{
                fontSize: '1.8rem', fontWeight: 800,
                background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>{s.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="about-details stagger">
          <div className="detail-card fade-in">
            <h3>&#127979; School Information</h3>
            <p><strong>Name:</strong> {school?.name || 'Vignan School'}</p>
            <p><strong>Established:</strong> {school?.established_year || 1995}</p>
            <p><strong>Principal:</strong> {school?.principal || 'Dr. Rajesh Kumar Sharma'}</p>
            <p><strong>Board:</strong> {school?.board || 'CBSE'} & Cambridge International</p>
            <p><strong>Campus:</strong> 15 Acres with state-of-the-art infrastructure</p>
          </div>

          <div className="detail-card fade-in">
            <h3>&#128205; Contact Details</h3>
            <p><strong>Address:</strong> {school?.address || 'Survey No. 123, Madinaguda'}</p>
            <p><strong>City:</strong> {school?.city || 'Hyderabad'}, {school?.state || 'Telangana'}</p>
            <p><strong>Phone:</strong> {school?.phone || '+91-40-2304-5678'}</p>
            <p><strong>Email:</strong> {school?.email || 'info@vignanschools.org'}</p>
            <p><strong>Website:</strong> {school?.website || 'https://vignanschools.org'}</p>
          </div>

          <div className="detail-card fade-in">
            <h3>&#127942; Our Vision</h3>
            <p style={{ lineHeight: '1.9' }}>To be a world-class educational institution that nurtures innovation, creativity, and leadership in every student, preparing them to be responsible global citizens who contribute positively to society.</p>
          </div>

          <div className="detail-card fade-in">
            <h3>&#127919; Our Mission</h3>
            <ul>
              <li>Provide holistic education combining academics and life skills</li>
              <li>Foster critical thinking and problem-solving abilities</li>
              <li>Encourage creativity, innovation, and scientific temper</li>
              <li>Build strong ethical values and social responsibility</li>
              <li>Promote physical fitness and mental well-being</li>
            </ul>
          </div>

          <div className="detail-card fade-in">
            <h3>&#128218; Academics</h3>
            <ul>
              <li>CBSE Curriculum (Classes 1-12)</li>
              <li>Cambridge International Programme</li>
              <li>Advanced Science & Mathematics Labs</li>
              <li>Coding & Robotics from Class 3</li>
              <li>Language Programs: English, Hindi, Telugu, Sanskrit</li>
            </ul>
          </div>

          <div className="detail-card fade-in">
            <h3>&#127941; Facilities</h3>
            <ul>
              <li>Smart Classrooms with Interactive Boards</li>
              <li>Olympic-size Swimming Pool</li>
              <li>Indoor Sports Complex & Gymnasium</li>
              <li>Library with 25,000+ Books</li>
              <li>Computer Labs with 200+ Systems</li>
              <li>Auditorium (1000 seating capacity)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
