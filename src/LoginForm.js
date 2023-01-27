import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Alert from "./Alert";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

const DEFAULT_FORMDATA = {
  username: "",
  password: ""
};

/** Form for logging in.
 *
 * State:
 * - formData, formError
 *
 * Props:
 * - handleLogin: function to call in parent.
 *
 * { RouteList} -> LoginForm
 */


function LoginForm({ handleLogin }) {
  const [formData, setFormData] = useState(DEFAULT_FORMDATA);
  const [formErrors, setFormErrors] = useState([]);
  // const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  /** Update form input. */

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fd => ({
      ...fd,
      [name]: value
    }));
  }

  console.log(formData);

  /** Call parent function and clear form. */

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      await handleLogin(formData);
      navigate("/");
    } catch (err) {
      console.log("err=", err)
      setFormErrors(err);
    }
  }

  return (
    <div>
      {formErrors.length > 0 && <Alert messages={formErrors} variant="danger" />}

      <h1 className="mb-3">Login</h1>

      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                onChange={handleChange}
                value={formData.username}
                type="text" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                onChange={handleChange}
                value={formData.password}
                type="password"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Log in
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );

}

export default LoginForm;