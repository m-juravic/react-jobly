import { Route, Routes } from "react-router-dom";
import CompanyList from "./CompanyList";
import Homepage from "./Homepage";
import JobList from "./JobList";
import CompanyDetail from "./CompanyDetail";

function RouteList() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/companies" element={<CompanyList />} />
      <Route path="/companies/:handle" element={<CompanyDetail />} />
      <Route path="/jobs" element={<JobList />} />
    </Routes>
  );
}

export default RouteList;