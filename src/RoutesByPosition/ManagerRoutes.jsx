import { Route, Routes, } from 'react-router-dom';
import Dashboard from '../pages/manager/Dashboard';
import Layout from '../layout/Layout';
import TeamLeaders from '../pages/manager/TeamLeaders';
import AddTeamLeader from '../pages/manager/AddTeamLeader';
import AttendanceChart from '../pages/manager/AttendanceChart';
import TeamLeaderDetails from '../pages/manager/TeamLeaderDetails';
export default function ManagerRoutes() {
  return (
    <>
      <Routes>
        {/* Parent route with Layout component */}
        <Route path="/" element={<Layout />}>
          {/* Nested routes */}
          <Route index element={<Dashboard />} />
          <Route path="team-leaders" element={<TeamLeaders />} />
          <Route path="add-team-leader" element={<AddTeamLeader />} />
          <Route path="team-leaders-details/:slug" element={<TeamLeaderDetails/>} />
          <Route path="attendance-chart" element={<AttendanceChart/>} />
        </Route>
      </Routes>
    </>
  )
}
