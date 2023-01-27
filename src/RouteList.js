import { Route, Routes, Navigate } from "react-router-dom";
import CompanyList from "./CompanyList";
import Homepage from "./Homepage";
import JobList from "./JobList";
import CompanyDetail from "./CompanyDetail";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm"
import ProfileForm from "./ProfileForm";
import userContext from "./userContext"
import { useContext } from "react";

/** Renders application routes */

function RouteList({handleLogin, handleRegister, handleUpdate}) {
  const { user } = useContext(userContext);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginForm handleLogin={handleLogin}/>} />
      <Route path="/register" element={<RegisterForm handleRegister={handleRegister}/>} />

      {user && <>
      <Route path="/companies" element={<CompanyList />} />
      <Route path="/companies/:handle" element={<CompanyDetail />} />
      <Route path="/jobs" element={<JobList />} />
      <Route path="/profile" element={<ProfileForm handleUpdate={handleUpdate}/>} />
      </>
      }
      {/* <Route path="/logout"/> */}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RouteList;