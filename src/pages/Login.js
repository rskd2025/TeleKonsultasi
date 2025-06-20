import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // ✅ Ganti axios dengan api instance
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';
import './Login.css';

function Login({ onSignupClick }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setUserError] = useState('');
  const [passError, setPassError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setUserError('');
    setPassError('');
    setGeneralError('');

    if (!username.trim()) {
      setUserError('Username tidak boleh kosong');
      return;
    }
    if (!password.trim()) {
      setPassError('Password tidak boleh kosong');
      return;
    }

    try {
      const response = await api.post('/users/login', {
        username,
        password,
      });

      const { user } = response.data;

      if (!user || !user.role) {
        setGeneralError('Login gagal. Data pengguna tidak valid.');
        return;
      }

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', 'loggedin');
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data) {
        const msg = error.response.data.message || error.response.data.error || 'Login gagal';

        if (msg.toLowerCase().includes('username')) {
          setUserError(msg);
        } else if (msg.toLowerCase().includes('password')) {
          setPassError(msg);
        } else {
          setGeneralError(msg);
        }
      } else {
        setGeneralError('Tidak dapat terhubung ke server');
      }
    }
  };

  return (
    <div className="login-container">
      <Container fluid className="h-100 d-flex align-items-center justify-content-center">
        <Row className="w-100">
          <Col xs={12} sm={10} md={6} lg={4} className="mx-auto">
            <div className="login-frame">
              <div className="login-content">
                <Card className="login-card">
                  <Card.Body>
                    <Form onSubmit={handleLogin}>
                      <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Masukkan username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          isInvalid={!!userError}
                          autoFocus
                        />
                        <Form.Control.Feedback type="invalid">
                          {userError}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Masukkan password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          isInvalid={!!passError}
                        />
                        <Form.Control.Feedback type="invalid">
                          {passError}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {generalError && (
                        <div className="text-danger mb-3">{generalError}</div>
                      )}

                      <Button variant="primary" type="submit" className="login-btn">
                        Login
                      </Button>

                      <div className="text-center mt-3">
                        <span style={{ color: '#ddd' }}>
                          Jika belum punya akun silakan{' '}
                          <span
                            onClick={onSignupClick}
                            style={{ color: '#007bff', fontWeight: 'bold', cursor: 'pointer' }}
                          >
                            Signup
                          </span>
                        </span>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
