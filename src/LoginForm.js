import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import alertContext from "./alertContext";
import Alert from "./Alert"

const DEFAULT_FORMDATA = {
  username: "",
  password: ""
}

function LoginForm({ handleLogin }) {
  const [formData, setFormData] = useState(DEFAULT_FORMDATA);
  const navigate = useNavigate();
  const { alert } = useContext(alertContext);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fd => ({
      ...fd,
      [name]: value
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(formData);
    setFormData(DEFAULT_FORMDATA);
    if (!alert) navigate("/");
  }

  return (
    <div>
      {alert && <Alert />}
      <form onSubmit={handleSubmit} >
        <div>
          <div>Username</div>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <div>Password</div>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  );

}

export default LoginForm;