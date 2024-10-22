import { Route, Routes } from 'react-router-dom';

import Layout from '../layout/Layout';
import Dashboard from '../pages/teamLeader/Dashboard';
import Profile from '../pages/teamLeader/Profile';
import ProfileCardDetail from '../pages/teamLeader/ProfileCardDetail';
import TeamMember from '../pages/teamLeader/TeamMember';
import RegisterUser from '../pages/founder/RegisterUser';
import AddTeamMember from '../pages/teamLeader/AddTeamMember';

export default function EmployeeRoutes() {
  return (
    <>
      <Routes path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profileCardDetail/:slug" element={<ProfileCardDetail />} />
        <Route path="teammember" element={<TeamMember />} />
        <Route path="registerUser" element={<RegisterUser />} />
        <Route path="addteammember" element={<AddTeamMember />} />
      </Routes>
    </>
  )
}
