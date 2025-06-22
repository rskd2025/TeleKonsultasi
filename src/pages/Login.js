import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';
import './Login.css';
import { useLoading } from '../components/LoadingContext';
import Loader from '../components/Loader';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setUserError] = useState('');
  const [passError, setPassError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, setLoading } = useLoading();

  // Redirect ke dashboard kalau sudah login
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Reset form setiap buka halaman login
  useEffect(() => {
    setLoading(false);
    setUsername('');
    setPassword('');
    setUserError('');
    setPassError('');
    setGeneralError('');
  }, [location.pathname, setLoading]);

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
      setLoading(true);
      const response = await api.post('/api/users/login', { username, password });
      const { user } = response.data;

      if (!user) {
        setGeneralError('Login gagal. Data pengguna tidak valid.');
        return;
      }

      // Simpan ke localStorage
      localStorage.setItem('user', JSON.stringify({
        id: user.pengguna_id,
        nama: user.nama_lengkap,
        username: user.username,
        role: user.role,
        groupAkses: user.groupAkses || [],
        modulAkses: user.modulAkses || [],
      }));
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
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="login-container">
      <Container fluid className="h-100 d-flex align-items-center justify-content-center">
        <Row className="w-100">
          <Col xs={12} sm={10} md={6} lg={4} className="mx-auto">
            <div className="login-frame">
              <div className="login-content">
                <Card className="login-card">
                  <Card.Body>
                    <Form onSubmit={handleLogin} autoComplete="off" key={location.key}>
                      <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Masukkan username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          isInvalid={!!userError}
                          autoFocus
                          autoComplete="new-username"
                        />
                        <Form.Control.Feedback type="invalid">{userError}</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Masukkan password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          isInvalid={!!passError}
                          autoComplete="new-password"
                        />
                        <Form.Control.Feedback type="invalid">{passError}</Form.Control.Feedback>
                      </Form.Group>

                      {generalError && (
                        <div className="text-danger mb-3">{generalError}</div>
                      )}

                      <Button variant="primary" type="submit" className="login-btn w-100">
                        Login
                      </Button>
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
