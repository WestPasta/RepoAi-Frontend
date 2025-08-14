import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Home.css';

function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const getOffsets = () => {
    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
    const home = document.getElementById('home-section')?.offsetTop ?? 0;
    const features = document.getElementById('features-section')?.offsetTop ?? 0;
    const support = document.getElementById('support-section')?.offsetTop ?? 0;
    return { headerHeight, home, features, support };
  };

  // Only track header scrolled state here
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Robust active-section detection via IntersectionObserver
  useEffect(() => {
    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
    const options = {
      root: null,
      // top offset to account for sticky header; choose generous bottom margin for big screens
      rootMargin: `-${headerHeight + 20}px 0px -40% 0px`,
      threshold: [0.15, 0.3, 0.6],
    };

    const homeEl = document.getElementById('home-section');
    const featuresEl = document.getElementById('features-section');
    const supportEl = document.getElementById('support-section');

    if (!('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver((entries) => {
      // determine which section has the highest visibility
      let best = { id: 'home', ratio: 0 };
      entries.forEach((e) => {
        const id = e.target.id.replace('-section', '');
        if (e.intersectionRatio > best.ratio) {
          best = { id, ratio: e.intersectionRatio };
        }
      });
      if (best.ratio >= 0.15) {
        setActiveSection(best.id);
      }
    }, options);

    homeEl && observer.observe(homeEl);
    featuresEl && observer.observe(featuresEl);
    supportEl && observer.observe(supportEl);

    return () => observer.disconnect();
  }, []);

  // Handle hash navigation like /#features-section and /#support-section
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const { headerHeight } = getOffsets();
        window.scrollTo({ top: el.offsetTop - headerHeight, behavior: 'smooth' });
      }
    }
  }, [location]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const { headerHeight } = getOffsets();
    const targetPosition = element.offsetTop - headerHeight;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  };

  return (
    <div className="home-container">
      {/* Header/Navigation */}
              <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
          <div className="logo-container">
            <img src="/RepoAiLogo.png" alt="RepoAi" className="logo" />
            <span className="logo-text">RepoAi</span>
          </div>
          <nav className="nav-links">
            <button 
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => scrollToSection('home-section')}
            >
              Home
            </button>
            <button 
              className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}
              onClick={() => scrollToSection('features-section')}
            >
              Features
            </button>
            <button 
              className={`nav-link ${activeSection === 'support' ? 'active' : ''}`}
              onClick={() => scrollToSection('support-section')}
            >
              Support
            </button>
            <NavLink to="/contact" className={({isActive}) => `nav-link${isActive ? ' active' : ''}`}>Contact Us</NavLink>
          </nav>
          <div className="auth-buttons">
            <Link to="/login" className="btn-get-started">Get Started</Link>
          </div>
        </header>

      {/* Hero Section */}
      <section id="home-section" className="hero">
        <div className="hero-content">
          <div className="tagline">
            <span className="sparkle">✨</span>
            Your Ultimate AI Companion!
          </div>
          <h1 className="main-headline">
            Elevate Your Development with Our AI-Powered Repository Tool
          </h1>
          <p className="hero-description">
            Highly customizable AI-powered solution for developers, startups, and teams. 
            Comes with everything you need - intelligent code analysis, automated documentation, 
            and more that you can easily customize for your workflow.
          </p>
          <Link to="/register" className="cta-button">Start Your Free Trial</Link>
        </div>
      </section>

      {/* UI Mockup Section */}
      <section className="ui-mockup">
        <div className="mockup-container">
          <div className="mockup-header">
            <div className="window-controls">
              <span className="control-dot"></span>
              <span className="control-dot"></span>
              <span className="control-dot"></span>
            </div>
          </div>
          <div className="mockup-content">
            <div className="sidebar">
              <div className="sidebar-item"></div>
              <div className="sidebar-item"></div>
              <div className="sidebar-item"></div>
              <div className="sidebar-item"></div>
            </div>
            <div className="main-content">
              <div className="content-line"></div>
              <div className="content-line"></div>
              <div className="content-line short"></div>
              <div className="content-line"></div>
              <div className="content-line short"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="features">
        <div className="features-content">
          <div className="features-header">
            <div className="features-tagline">✨ Some of Main Features</div>
            <h2 className="features-title">Key Features of Our Tool</h2>
            <p className="features-description">
              Our AI repository tool is designed to empower you with exceptional development capabilities, 
              making the coding process more efficient, accurate, and enjoyable.
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3 className="feature-title">Intelligent Code Analysis</h3>
              <p className="feature-description">
                Our AI analyzes your code, suggests improvements, and identifies potential issues
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Code Quality Check</h3>
              <p className="feature-description">
                Say goodbye to code smells and maintain high-quality standards
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3 className="feature-title">Security Scanning</h3>
              <p className="feature-description">
                Detect vulnerabilities and security issues in your codebase
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3 className="feature-title">Auto Documentation</h3>
              <p className="feature-description">
                Generate comprehensive documentation automatically from your code
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3 className="feature-title">Code Refactoring</h3>
              <p className="feature-description">
                Get intelligent suggestions for improving code structure and readability
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3 className="feature-title">Performance Optimization</h3>
              <p className="feature-description">
                Identify bottlenecks and optimize your code for better performance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support-section" className="support">
        <div className="support-content">
          <div className="support-header">
            <div className="support-tagline">💬 Need Help?</div>
            <h2 className="support-title">Support</h2>
            <p className="support-description">
              This is a demo section. If you need any assistance, feel free to reach out. We’re here to help you get the most out of RepoAi.
            </p>
          </div>

          <div className="support-grid">
            <div className="support-card">
              <div className="support-icon">📄</div>
              <h3 className="support-card-title">Docs & Guides</h3>
              <p className="support-card-text">Browse quickstart guides and best practices to get productive fast.</p>
              <button className="support-link-btn">View Docs</button>
            </div>

            <div className="support-card">
              <div className="support-icon">❓</div>
              <h3 className="support-card-title">FAQ</h3>
              <ul className="support-faq">
                <li><span>How do I connect a repo?</span><small> Go to settings → connections.</small></li>
                <li><span>Is there a free trial?</span><small> Yes, 14 days for new users.</small></li>
                <li><span>Can I export reports?</span><small> PDFs and CSVs are supported.</small></li>
              </ul>
            </div>

            <div className="support-card">
              <div className="support-icon">👥</div>
              <h3 className="support-card-title">Community</h3>
              <p className="support-card-text">Join our community to share tips and find solutions from other users.</p>
              <button className="support-link-btn">Join Community</button>
            </div>

            <div className="support-card">
              <div className="support-icon">📩</div>
              <h3 className="support-card-title">Contact Support</h3>
              <p className="support-card-text">Didn’t find what you’re looking for? Our team is happy to help.</p>
              <Link to="/contact" className="support-cta-btn">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;



