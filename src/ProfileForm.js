import userContext from "./userContext";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Alert from "./Alert";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

/** Form for updating profile.
 *
 * State:
 * -formData, formErrors
 *
 * Props:
 * - handleUpdate: function to call in parent.
 *
 * Context:
 * -userContext
 *
 * { RouteList} -> ProfileForm
 */

function ProfileForm({ handleUpdate }) {
  const { user } = useContext(userContext);

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  });
  const [formErrors, setFormErrors] = useState([]);

  const navigate = useNavigate();

  /** Call parent function. */
  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      await handleUpdate(formData);
      navigate("/profile");
    } catch (err) {
      setFormErrors(err);
    }
  }

  /** Update form input. */
  function handleChange(evt) {
    const input = evt.target;
    setFormData(formData => ({
      ...formData,
      [input.name]: input.value,
    }));
  }

  return (
    <div>
      {formErrors.length > 0 ? <Alert messages={formErrors} type="danger" /> : null}

      <h1 className="mb-3">Profile</h1>

      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit} method="patch">
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                value={user.username}
                readOnly
                disabled
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
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>

          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProfileForm;