import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const DEFAULT_FORMDATA = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: ""
}

/** Form for registering.
 *
 * Props:
 * - handleRegister: function to call in parent.
 *
 * { RouteList} -> RegisterForm
 */

function RegisterForm({ handleRegister }) {
  const [formData, setFormData] = useState(DEFAULT_FORMDATA);

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
      console.log("Error handling registration", err);
    }
    setFormData(DEFAULT_FORMDATA);
  }

  return (
    <div>
    {/* {formError && <Alert message={formError} />} */}

    <form onSubmit={handleSubmit} >
      <div>
        <div>Username</div>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <div>Password</div>
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          required
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
      <button>Submit</button>
    </form>
  </div>
);
}

export default RegisterForm;

