import userContext from "./userContext";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Alert from "./Alert";

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
      console.log("errors=", err)
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

      <form onSubmit={handleSubmit} method="patch">
        <div>
          <div>Username</div>
          <input
            value={user.username}
            readOnly
            disabled
          />
        </div>
        <div>
          <div>First Name</div>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <div>Last Name</div>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <div>Email</div>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button>Save Changes</button>
      </form>
    </div>
  );
}

export default ProfileForm;