import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page since we now have both forms there
    navigate('/login');
  }, [navigate]);

  return null;
}

export default Register;



