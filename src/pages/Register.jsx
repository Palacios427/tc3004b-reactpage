import React, { useState } from 'react';

const RegisterForm = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [form, setForm] = useState({ name: '', username: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');

    try {
      const res = await fetch(API_URL + '/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setMsg(data.message || data.error);
    } catch (error) {
      console.error(error);
      setMsg('Error al conectar con el servidor');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" onChange={handleChange} required /><br />
        <input name="username" placeholder="Usuario" onChange={handleChange} required /><br />
        <input name="password" placeholder="Contraseña" type="password" onChange={handleChange} required /><br />
        <button type="submit">Registrar</button>
      </form>
      <p>{msg}</p>
    </div>
  );
};

export default RegisterForm;
