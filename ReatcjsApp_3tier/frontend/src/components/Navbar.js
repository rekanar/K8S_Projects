import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { path: '/', label: 'Home', icon: '&#127968;' },
    { path: '/students', label: 'Students', icon: '&#127891;' },
    { path: '/teachers', label: 'Faculty', icon: '&#128105;&#8205;&#127979;' },
    { path: '/courses', label: 'Courses', icon: '&#128218;' },
    { path: '/announcements', label: 'News', icon: '&#128227;' },
    { path: '/about', label: 'About', icon: '&#8505;' },
  ];

  return (
    <nav className="navbar" style={{
      boxShadow: scrolled ? '0 8px 30px rgba(0,0,0,0.2)' : 'none',
      background: scrolled ? 'rgba(10, 22, 40, 0.95)' : 'rgba(10, 22, 40, 0.85)',
    }}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="school-logo">V</div>
          <div className="school-name">
            Vignan School
            <span>Igniting Minds, Inspiring Futures</span>
          </div>
        </Link>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '\u2715' : '\u2630'}
        </button>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={location.pathname === link.path ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                <span dangerouslySetInnerHTML={{ __html: link.icon }} style={{ marginRight: '5px', fontSize: '0.85em' }} />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
