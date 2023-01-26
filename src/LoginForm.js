import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Alert from "./Alert";

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
  // const [formErrors, setFormErrors] = useState([]);
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  /** Update form input. */

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fd => ({
      ...fd,
      [name]: value
    }));
  }

  /** Call parent function and clear form. */

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      await handleLogin(formData);
      navigate("/");
    } catch (err) {
      setFormError(err.message);
    }
  }

  return (
    <div>
      {formError && <Alert message={formError} />}

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
        <button>Login</button>
      </form>
    </div>
  );

}

export default LoginForm;