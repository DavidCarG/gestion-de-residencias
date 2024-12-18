import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, Link } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#f5f5f5',
    padding: '20px',
  },
  card: {
    background: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    color: '#333',
    marginBottom: '10px',
    fontSize: '24px',
  },
  subtitle: {
    color: '#666',
    fontSize: '14px',
  },
  formField: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#555',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '2px solid #e1e1e1',
    borderRadius: '6px',
    fontSize: '14px',
    transition: 'border-color 0.3s ease',
  },
  button: {
    width: '100%',
    padding: '12px',
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  footer: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
    color: '#666',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(import.meta.env.VITE_API_BASE_URL_AUTH, {
        username,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((error) => {
        console.error('Registration error:', error);
      });
  };
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Registro</h1>
          <p style={styles.subtitle}>
            Complete el formulario para crear su cuenta
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.formField}>
            <label style={styles.label}>Username</label>
            <input
              style={styles.input}
              type="text"
              placeholder="usuario123"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div style={styles.formField}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              placeholder="correo@ejemplo.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={styles.formField}>
            <label style={styles.label}>Contraseña</label>
            <input
              style={styles.input}
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.background = '#0056b3')}
            onMouseOut={(e) => (e.target.style.background = '#007bff')}
          >
            Registrarse
          </button>

          <p style={styles.footer}>
            ¿Ya tienes una cuenta?{' '}
            <Link to="/" style={styles.link}>
              Iniciar Sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
