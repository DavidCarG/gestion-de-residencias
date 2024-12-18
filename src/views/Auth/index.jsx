import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

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
    '&:hover': {
      background: '#0056b3',
    },
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
    cursor: 'pointer',
  },
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(import.meta.env.VITE_API_BASE_URL_LOGIN, { email, password })
      .then((res) => {
        console.log(res);
        if (res.data == 'Success') {
          navigate('/');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Bienvenido</h1>
          <p style={styles.subtitle}>Por favor ingresa tus credenciales</p>
        </div>

        <form onSubmit={handleSubmit}>
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
            Iniciar Sesión
          </button>

          <p style={styles.footer}>
            ¿No tienes una cuenta?{' '}
            <a href="/register" style={styles.link}>
              Registrarse
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
