import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from './Header';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post('http://127.0.0.1:8000/user/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.msg === 'login success') {
          const { token, role,_id } = response.data.user;
          localStorage.setItem('token', token);
          localStorage.setItem('role', role); // Store the user's role in local storage

          if (role === 'admin') {
            navigate(`/admintest/${_id}`); // Redirect to the admin dashboard if the role is admin
          } else {
            //navigate(`/UserTutorials/${_id}`) // Redirect to the user dashboard for any other role (default is 'user')
            navigate(`/Tuto/${_id}`)
          }
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data === 'email does not exist') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'email does not exist',
          });
        } else {
          if (error.response.data === 'wrong password') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'wrong password',
            });
          } else if (error.response.data.errors[0].msg === 'password not valid , at least 6 characters') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'password not valid , at least 6 characters',
            });
          }
        }
      });
  };

  return (
    <div className="login-card">
      <Header></Header>
      <Card style={{ width: '18rem' }}>
        <h1>Login</h1>
        <Card.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <div className="button-login-group">
            <Button variant="primary" type="submit" onClick={handleLogin}>
              Submit
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginForm;

