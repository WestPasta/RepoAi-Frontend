import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(loginData.email, loginData.password);
      navigate('/main');
    } catch (error) {
      setError('Failed to sign in: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signup(registerData.email, registerData.password, registerData.name);
      navigate('/main');
    } catch (error) {
      setError('Failed to create account: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="home-container">
      {/* Header/Navigation */}
      <header className="header">
        <div className="logo-container">
          <img src="/RepoAiLogo.png" alt="RepoAi" className="logo" />
          <span className="logo-text">RepoAi</span>
        </div>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/#features-section" className="nav-link">Features</Link>
          <Link to="/#support-section" className="nav-link">Support</Link>
          <Link to="/contact" className="nav-link">Contact Us</Link>
        </nav>
        <div className="auth-buttons">
          <Link to="/login" className="btn-get-started">Get Started</Link>
        </div>
      </header>

      {/* Auth Section */}
      <section className="hero" style={{ marginTop: '80px' }}>
        <div className="hero-content">
          {/* Two Panel Auth Form with Sliding */}
          <div className="auth-card-container">
            <div className="auth-card-track" style={{ transform: isLogin ? 'translateX(0%)' : 'translateX(-50%)' }}>
              {/* Panel 1: Login Form + Welcome Message */}
              <div className="auth-card-panel">
                <div className="auth-form-side">
                  <div className="auth-form-header">
                    <h2 className="auth-form-title">Sign In</h2>
                    <div className="social-login">
                      <button className="social-btn">
                        <span className="social-icon">f</span>
                      </button>
                      <button className="social-btn">
                        <span className="social-icon">G+</span>
                      </button>
                      <button className="social-btn">
                        <span className="social-icon">in</span>
                      </button>
                    </div>
                    <div className="social-separator">or use your account</div>
                  </div>

                  {error && <div className="error-message" style={{color: 'red', marginBottom: '10px', textAlign: 'center'}}>{error}</div>}
                  <form onSubmit={handleLoginSubmit} className="auth-form">
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input 
                        type="email" 
                        value={loginData.email} 
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})} 
                        required 
                        className="form-input"
                        placeholder="Email"
                        disabled={loading}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Password</label>
                      <input 
                        type="password" 
                        value={loginData.password} 
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})} 
                        required 
                        className="form-input"
                        placeholder="Password"
                        disabled={loading}
                      />
                    </div>
                    
                    <div className="forgot-password">
                      <a href="#" className="forgot-link">Forgot your password?</a>
                    </div>
                    
                    <button type="submit" className="auth-submit-btn login-btn" disabled={loading}>
                      {loading ? 'SIGNING IN...' : 'SIGN IN'}
                    </button>
                  </form>
                </div>

                <div className="auth-welcome-side">
                  <div className="welcome-content">
                    <h2 className="welcome-title">Hello, Friend!</h2>
                    <p className="welcome-description">
                      Enter your personal details and start journey with us
                    </p>
                    <button onClick={toggleForm} className="welcome-toggle-btn">
                      SIGN UP
                    </button>
                  </div>
                </div>
              </div>

              {/* Panel 2: Welcome Message + Register Form */}
              <div className="auth-card-panel">
                <div className="auth-welcome-side">
                  <div className="welcome-content">
                    <h2 className="welcome-title">Welcome Back!</h2>
                    <p className="welcome-description">
                      To keep connected with us please login with your personal info
                    </p>
                    <button onClick={toggleForm} className="welcome-toggle-btn">
                      SIGN IN
                    </button>
                  </div>
                </div>

                <div className="auth-form-side">
                  <div className="auth-form-header">
                    <h2 className="auth-form-title">Create Account</h2>
                    <div className="social-login">
                      <button className="social-btn">
                        <span className="social-icon">f</span>
                      </button>
                      <button className="social-btn">
                        <span className="social-icon">G+</span>
                      </button>
                      <button className="social-btn">
                        <span className="social-icon">in</span>
                      </button>
                    </div>
                    <div className="social-separator">or use your email for registration</div>
                  </div>

                  {error && <div className="error-message" style={{color: 'red', marginBottom: '10px', textAlign: 'center'}}>{error}</div>}
                  <form onSubmit={handleRegisterSubmit} className="auth-form">
                    <div className="form-group">
                      <label className="form-label">Name</label>
                      <input 
                        type="text" 
                        value={registerData.name} 
                        onChange={(e) => setRegisterData({...registerData, name: e.target.value})} 
                        required 
                        className="form-input"
                        placeholder="Name"
                        disabled={loading}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input 
                        type="email" 
                        value={registerData.email} 
                        onChange={(e) => setRegisterData({...registerData, email: e.target.value})} 
                        required 
                        className="form-input"
                        placeholder="Email"
                        disabled={loading}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Password</label>
                      <input 
                        type="password" 
                        value={registerData.password} 
                        onChange={(e) => setRegisterData({...registerData, password: e.target.value})} 
                        required 
                        className="form-input"
                        placeholder="Password"
                        disabled={loading}
                      />
                    </div>
                    
                    <button type="submit" className="auth-submit-btn register-btn" disabled={loading}>
                      {loading ? 'SIGNING UP...' : 'SIGN UP'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;



