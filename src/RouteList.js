import { Route, Routes, Navigate } from "react-router-dom";
import CompanyList from "./CompanyList";
import Homepage from "./Homepage";
import JobList from "./JobList";
import CompanyDetail from "./CompanyDetail";
import LoginForm from "./LoginForm";

/** Renders application routes */

function RouteList({handleLogin, handleLogout}) {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/companies" element={<CompanyList />} />
      <Route path="/companies/:handle" element={<CompanyDetail />} />
      <Route path="/jobs" element={<JobList />} />
      <Route path="/login" element={<LoginForm handleLogin={handleLogin}/>} />
      {/* <Route path="/logout"/> */}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RouteList;