import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Vignan School</h4>
          <p style={{ marginBottom: '12px' }}>
            Survey No. 123, Madinaguda<br />
            Hyderabad, Telangana 500049
          </p>
          <p>Phone: +91-40-2304-5678</p>
          <p>Email: info@vignanschools.org</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <p><Link to="/about">About Us</Link></p>
          <p><Link to="/courses">Academics</Link></p>
          <p><Link to="/announcements">Announcements</Link></p>
          <p><Link to="/teachers">Faculty</Link></p>
          <p><Link to="/students">Students</Link></p>
        </div>
        <div className="footer-section">
          <h4>Affiliations</h4>
          <p>CBSE Affiliation No: 3630XXX</p>
          <p>Cambridge International School</p>
          <p>ISO 9001:2015 Certified</p>
          <p style={{ marginTop: '12px', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
            3-Tier App: React + Node.js + PostgreSQL<br />
            Deployed on Kubernetes (Kind)
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Vignan School, Hyderabad. All rights reserved. | Est. 1995
      </div>
    </footer>
  );
}

export default Footer;
