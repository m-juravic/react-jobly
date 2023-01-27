import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Alert from "./Alert";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

const DEFAULT_FORMDATA = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: ""
};

/** Form for registering.
 *
 * State:
 * - formData, formErrors
 *
 * Props:
 * - handleRegister: function to call in parent.
 *
 * { RouteList} -> RegisterForm
 */

function RegisterForm({ handleRegister }) {
  const [formData, setFormData] = useState(DEFAULT_FORMDATA);
  const [formErrors, setFormErrors] = useState([]);

  const navigate = useNavigate();

  /** Update form input. */
  function handleChange(evt) {
    const input = evt.target;
    setFormData(formData => ({
      ...formData,
      [input.name]: input.value,
    }));
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      await handleRegister(formData);
      navigate("/");
    } catch (err) {
      setFormErrors(err);
    }
    setFormData(DEFAULT_FORMDATA);
  }

  return (
    <div>
      {formErrors.length > 0 && <Alert messages={formErrors} variant="danger" />}

      <h1 className="mb-3">Register</h1>

      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                onChange={handleChange}
                value={formData.username}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                onChange={handleChange}
                value={formData.password}
                type="password"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
                required
              />
            </Form.Group>


            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                onChange={handleChange}
                value={formData.email}
                type="email"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>

          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RegisterForm;

