import userContext from "./userContext";
import { useContext, useState } from "react";

// TODO: handleUpdate

/** Form for updating profile.
 *
 * Props:
 * - tbd: function to call in parent.
 *
 * { RouteList} -> ProfileForm
 */


function ProfileForm(){
  const {user} = useContext(userContext);

  const [formData, setFormData] = useState(user);
  const [formErrors, setFormErrors] = useState([]);

  // TODO:
  function handleSubmit(){

  }

  // TODO:
  function handleChange(){

  }



  return (
    <form onSubmit={handleSubmit} >
    <div>
      <div>Username</div>
      <input
        name="username"
        value={formData.username}
        readOnly
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
  )
}

export default ProfileForm;