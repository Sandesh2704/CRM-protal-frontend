import { Route, Routes, } from 'react-router-dom';
import Dashboard from '../pages/founder/Dashboard';
import Profile from '../pages/teamLeader/Profile';
import Layout from '../layout/Layout';
import AllEmployes from '../pages/founder/AllEmployes';
import AllManagers from '../pages/founder/AllManagers';
import AddNewManager from '../pages/founder/AddNewManager';
import EmployeDetails from '../pages/founder/EmployeDetails';


export default function FounderRoutes() {
  return (
    <>
      <Routes>
        {/* Parent route with Layout component */}
        <Route path="/" element={<Layout />}>
          {/* Nested routes */}
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="employees" element={<AllEmployes />} />
          <Route path="add-new-manager" element={<AddNewManager />} />
          <Route path="manager-list" element={<AllManagers />} />
          <Route path="employe-details/:slug" element={<EmployeDetails/>} />
        </Route>
      </Routes>
    </>
  )
}
